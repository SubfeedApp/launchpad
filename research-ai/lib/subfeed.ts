const SUBFEED_API = process.env.NODE_ENV === "production" 
  ? "https://api.subfeed.app" 
  : "https://dev-api.subfeed.app";
const SUBFEED_KEY = process.env.SUBFEED_API_KEY;
const SUBFEED_ENTITY_ID = process.env.SUBFEED_ENTITY_ID;

/**
 * Chat with entity
 */
export async function chat(message: string, model?: string) {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/chat`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, model }),
    }
  );

  if (!res.ok) {
    throw new Error(`Subfeed API error: ${res.status}`);
  }

  return res.json();
}

/**
 * Web search with AI answer
 */
export async function search(
  query: string,
  options?: {
    max_results?: number;
    topic?: "general" | "news" | "finance";
    time_range?: "day" | "week" | "month" | "year";
  }
) {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/actions/web_search`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: {
          query,
          max_results: options?.max_results || 8,
          include_answer: true,
          topic: options?.topic || "general",
          time_range: options?.time_range,
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Subfeed API error: ${res.status}`);
  }

  return res.json();
}
