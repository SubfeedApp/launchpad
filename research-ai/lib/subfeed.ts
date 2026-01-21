const SUBFEED_API = process.env.SUBFEED_API_URL || "https://api.subfeed.app";
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
 * Parse error message from API response
 */
function parseErrorMessage(errorData: any, fallback: string): string {
  if (!errorData) return fallback;
  if (typeof errorData.error === 'string') return errorData.error;
  if (errorData.error?.message) return errorData.error.message;
  if (errorData.message) return errorData.message;
  if (typeof errorData.error === 'object') return JSON.stringify(errorData.error);
  return fallback;
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

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    const errorMessage = parseErrorMessage(data, `Subfeed API error: ${res.status}`);

    // Check for addon not enabled
    if (errorMessage.includes("Action not found") || errorMessage.includes("not found") || res.status === 403) {
      throw new Error(
        "Web search addon is not enabled. Please enable the 'web_search' addon on your entity at cloud.subfeed.app"
      );
    }

    throw new Error(errorMessage);
  }

  return data;
}
