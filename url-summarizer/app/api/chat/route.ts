import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/subfeed';

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, model } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'message is required' },
        { status: 400 }
      );
    }

    const response = await chat(message, sessionId, model);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chat failed' },
      { status: 500 }
    );
  }
}
