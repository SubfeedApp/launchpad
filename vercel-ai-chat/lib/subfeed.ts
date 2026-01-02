const SUBFEED_API = 'https://api.subfeed.app';
const SUBFEED_KEY = process.env.SUBFEED_API_KEY!;
const SUBFEED_ENTITY_ID = process.env.SUBFEED_ENTITY_ID!;

export interface ChatResponse {
  response: string;
  sessionId: string;
  usage: {
    tokensIn: number;
    tokensOut: number;
    rawTokens: number;
    multiplier: number;
    weightedTokens: number;
  };
}

/**
 * Chat with Subfeed entity
 */
export async function chat(
  message: string,
  sessionId?: string,
  model?: string
): Promise<ChatResponse> {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/chat`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        sessionId: sessionId || undefined,
        model: model || undefined,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Subfeed API error: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}
