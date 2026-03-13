import os
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# ── Models ────────────────────────────────────────────────────────────────────
class Campaign(BaseModel):
    id: Optional[str] = None
    title: str
    brief: str
    budget: int
    niche_target: List[str] = []
    min_followers: int = 1000
    max_followers: int = 200000
    deliverables: Optional[str] = None

class Creator(BaseModel):
    id: str
    name: str
    instagram_handle: Optional[str] = None
    youtube_handle: Optional[str] = None
    followers_count: int = 0
    engagement_rate: float = 0.0
    niche: List[str] = []
    city: Optional[str] = None
    rate_reel: int = 0
    rate_story: int = 0
    rate_youtube: int = 0
    bio: Optional[str] = None

class MatchRequest(BaseModel):
    campaign: Campaign
    creators: List[Creator]

class FetchStatsRequest(BaseModel):
    instagram_handle: str

class GenerateBriefTagsRequest(BaseModel):
    brief: str

class MatchResult(BaseModel):
    creator_id: str
    score: int
    reason: str

class StatsResult(BaseModel):
    followers_count: int
    engagement_rate: float
    bio: str
    profile_pic_url: Optional[str] = None

class BriefTagsResult(BaseModel):
    niches: List[str]
    ideal_follower_range: List[int]
    keywords: List[str]


# ── FastAPI App ────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 DirectDeal AI Service starting...")
    yield
    print("👋 DirectDeal AI Service shutting down...")

app = FastAPI(
    title="DirectDeal AI Service",
    description="AI Matching Engine for DirectDeal marketplace",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://directdeal.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY", ""))


# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "status": "live",
        "service": "DirectDeal AI Service",
        "version": "1.0.0",
        "endpoints": ["/match", "/fetch-stats", "/generate-brief-tags"],
    }


# ── POST /match ───────────────────────────────────────────────────────────────
@app.post("/match", response_model=List[MatchResult])
async def match_creators(request: MatchRequest):
    """
    LangGraph-powered semantic matching.
    Runs: filter → score (Groq) → rank → top 5
    """
    from matching_agent import run_matching_graph

    campaign_dict = request.campaign.model_dump()
    creators_list = [c.model_dump() for c in request.creators]

    if not creators_list:
        raise HTTPException(status_code=400, detail="No creators provided for matching.")

    top_matches = run_matching_graph(campaign_dict, creators_list)

    return [
        MatchResult(
            creator_id=match["id"],
            score=match.get("match_score", 0),
            reason=match.get("match_reason", ""),
        )
        for match in top_matches
    ]


# ── POST /fetch-stats ─────────────────────────────────────────────────────────
@app.post("/fetch-stats", response_model=StatsResult)
async def fetch_stats(request: FetchStatsRequest):
    """
    Calls Apify Instagram Profile Scraper actor to pull real stats.
    Falls back to simulated data if APIFY_API_KEY not set.
    """
    apify_token = os.getenv("APIFY_API_KEY", "")
    handle = request.instagram_handle.lstrip("@")

    if not apify_token:
        # Return simulated data in dev mode
        return StatsResult(
            followers_count=15200,
            engagement_rate=4.1,
            bio=f"Creator @ Instagram | @{handle} | 🇮🇳",
            profile_pic_url=None,
        )

    try:
        import httpx

        apify_url = "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/runs"
        payload = {
            "usernames": [handle],
            "resultsLimit": 1,
        }
        headers = {"Content-Type": "application/json"}
        params = {"token": apify_token, "waitForFinish": 60}

        async with httpx.AsyncClient(timeout=90) as client:
            run_resp = await client.post(apify_url, json=payload, headers=headers, params=params)
            run_data = run_resp.json()

            dataset_id = run_data.get("data", {}).get("defaultDatasetId")
            if not dataset_id:
                raise ValueError("Apify run did not return a dataset ID.")

            items_resp = await client.get(
                f"https://api.apify.com/v2/datasets/{dataset_id}/items?token={apify_token}"
            )
            items = items_resp.json()

            if not items:
                raise ValueError("Apify returned no data for this handle.")

            profile = items[0]
            return StatsResult(
                followers_count=profile.get("followersCount", 0),
                engagement_rate=round(profile.get("postsCount", 1) and (
                    profile.get("avgLikes", 0) + profile.get("avgComments", 0)
                ) / max(profile.get("followersCount", 1), 1) * 100, 2),
                bio=profile.get("biography", ""),
                profile_pic_url=profile.get("profilePicUrl"),
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")


# ── POST /generate-brief-tags ─────────────────────────────────────────────────
@app.post("/generate-brief-tags", response_model=BriefTagsResult)
async def generate_brief_tags(request: GenerateBriefTagsRequest):
    """
    Uses Groq llama-3.1-8b-instant to extract niche tags,
    ideal follower range, and keywords from a campaign brief.
    """
    prompt = f"""
Analyze this campaign brief and extract structured metadata.

CAMPAIGN BRIEF:
"{request.brief}"

Respond ONLY with valid JSON:
{{
  "niches": ["<1-4 relevant niches from: Food, Tech, Fitness, Skincare, Finance, Fashion, Travel>"],
  "ideal_follower_range": [<min_followers_int>, <max_followers_int>],
  "keywords": ["<3-6 key content style or topic keywords>"]
}}
"""
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=300,
        )
        raw = response.choices[0].message.content.strip()
        start = raw.find("{")
        end = raw.rfind("}") + 1
        result = json.loads(raw[start:end])

        return BriefTagsResult(
            niches=result.get("niches", []),
            ideal_follower_range=result.get("ideal_follower_range", [1000, 200000]),
            keywords=result.get("keywords", []),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate brief tags: {str(e)}")
