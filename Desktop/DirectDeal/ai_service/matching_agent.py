import os
import json
from typing import List, Dict, Any, TypedDict, Optional
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY", ""))


# ── State Schema ──────────────────────────────────────────────────────────────
class MatchState(TypedDict):
    campaign: Dict[str, Any]
    all_creators: List[Dict[str, Any]]
    filtered_creators: List[Dict[str, Any]]
    scored_creators: List[Dict[str, Any]]
    top_matches: List[Dict[str, Any]]


# ── Node 1: Hard-filter by follower range and niche ───────────────────────────
def filter_creators(state: MatchState) -> MatchState:
    campaign = state["campaign"]
    all_creators = state["all_creators"]
    min_f = campaign.get("min_followers", 1000)
    max_f = campaign.get("max_followers", 200000)
    niche_target = [n.lower() for n in campaign.get("niche_target", [])]

    filtered = []
    for creator in all_creators:
        followers = creator.get("followers_count", 0)
        in_range = min_f <= followers <= max_f

        creator_niches = [n.lower() for n in creator.get("niche", [])]
        niche_match = any(n in creator_niches for n in niche_target) if niche_target else True

        if in_range and niche_match:
            filtered.append(creator)

    return {**state, "filtered_creators": filtered}


# ── Node 2: Score each creator with Groq LLM (0-100) ─────────────────────────
def score_creators(state: MatchState) -> MatchState:
    campaign = state["campaign"]
    filtered = state["filtered_creators"]

    if not filtered:
        return {**state, "scored_creators": []}

    scored = []

    for creator in filtered:
        prompt = f"""
You are an expert influencer marketing analyst. Score this creator for the given campaign.

CAMPAIGN BRIEF:
Title: {campaign.get('title', '')}
Brief: {campaign.get('brief', '')}
Target Niches: {', '.join(campaign.get('niche_target', []))}
Budget: ₹{campaign.get('budget', 0)}

CREATOR PROFILE:
Name: {creator.get('name', 'Unknown')}
Niches: {', '.join(creator.get('niche', []))}
Followers: {creator.get('followers_count', 0)}
Engagement Rate: {creator.get('engagement_rate', 0)}%
City: {creator.get('city', 'Unknown')}
Bio: {creator.get('bio', 'N/A')}
Rate per Reel: ₹{creator.get('rate_reel', 0)}

SCORING CRITERIA (total 100 pts):
- Content style alignment with campaign: 0-40 pts
- Audience demographic match: 0-30 pts
- Engagement quality score: 0-20 pts
- Platform reliability & consistency: 0-10 pts

Respond ONLY with valid JSON in this exact format:
{{
  "score": <integer 0-100>,
  "reason": "<2 concise sentences explaining why this creator is or isn't a great match>"
}}
"""
        try:
            response = groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=200,
            )
            raw = response.choices[0].message.content.strip()
            # Extract JSON from response
            start = raw.find("{")
            end = raw.rfind("}") + 1
            result = json.loads(raw[start:end])
            scored.append({**creator, "match_score": result.get("score", 50), "match_reason": result.get("reason", "")})
        except Exception as e:
            # Fallback: score based on engagement rate
            fallback_score = min(100, int(creator.get("engagement_rate", 2) * 15))
            scored.append({**creator, "match_score": fallback_score, "match_reason": "Score calculated from engagement metrics."})

    return {**state, "scored_creators": scored}


# ── Node 3: Rank and return top 5 ─────────────────────────────────────────────
def rank_creators(state: MatchState) -> MatchState:
    scored = state["scored_creators"]
    ranked = sorted(scored, key=lambda c: c.get("match_score", 0), reverse=True)
    top5 = ranked[:5]
    return {**state, "top_matches": top5}


# ── LangGraph Orchestrator ─────────────────────────────────────────────────────
def run_matching_graph(campaign: Dict[str, Any], creators: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Runs the 3-node LangGraph matching pipeline:
    filter → score → rank
    Returns top 5 matches with score + reason.
    """
    try:
        from langgraph.graph import StateGraph, END

        workflow = StateGraph(MatchState)
        workflow.add_node("filter", filter_creators)
        workflow.add_node("score", score_creators)
        workflow.add_node("rank", rank_creators)

        workflow.set_entry_point("filter")
        workflow.add_edge("filter", "score")
        workflow.add_edge("score", "rank")
        workflow.add_edge("rank", END)

        graph = workflow.compile()

        initial_state: MatchState = {
            "campaign": campaign,
            "all_creators": creators,
            "filtered_creators": [],
            "scored_creators": [],
            "top_matches": [],
        }

        result = graph.invoke(initial_state)
        return result["top_matches"]

    except ImportError:
        # Fallback if langgraph not installed: run nodes sequentially
        state: MatchState = {
            "campaign": campaign,
            "all_creators": creators,
            "filtered_creators": [],
            "scored_creators": [],
            "top_matches": [],
        }
        state = filter_creators(state)
        state = score_creators(state)
        state = rank_creators(state)
        return state["top_matches"]
