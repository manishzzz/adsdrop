import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy route that forwards match requests to FastAPI backend.
 * Keeps Groq API key server-side.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fastapiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

    const response = await fetch(`${fastapiUrl}/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: `AI service error: ${err}` }, { status: response.status });
    }

    const matches = await response.json();
    return NextResponse.json(matches);
  } catch (error: any) {
    console.error('[Match API]', error);
    return NextResponse.json({ error: error.message || 'Failed to reach AI service' }, { status: 500 });
  }
}
