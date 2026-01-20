const SUBFEED_API = process.env.SUBFEED_API_URL || "https://api.subfeed.app";
const SUBFEED_KEY = process.env.SUBFEED_API_KEY;
const SUBFEED_ENTITY_ID = process.env.SUBFEED_ENTITY_ID;

/**
 * Chat with entity
 */
export async function chat(message: string, sessionId?: string, model?: string) {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/chat`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sessionId, model }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = parseErrorMessage(errorData, `Subfeed API error: ${res.status}`);
    throw new Error(errorMessage);
  }

  return res.json();
}

/**
 * Scrape URL content
 */
export async function scrape(url: string) {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/actions/web_scrape`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: { url, format: "markdown" },
      }),
    }
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    const errorMessage = parseErrorMessage(data, `Scrape failed: ${res.status}`);

    // Check for addon not enabled
    if (errorMessage.includes("Action not found") || errorMessage.includes("not found")) {
      throw new Error(
        "Web scrape addon is not enabled. Please enable the 'web_scrape' addon on your entity at cloud.subfeed.app"
      );
    }

    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Parse error message from API response
 */
function parseErrorMessage(errorData: any, fallback: string): string {
  if (!errorData) return fallback;

  // Direct string error
  if (typeof errorData.error === 'string') {
    return errorData.error;
  }

  // Nested error object
  if (errorData.error?.message) {
    return errorData.error.message;
  }

  // Other common fields
  if (errorData.message) return errorData.message;
  if (errorData.detail) return errorData.detail;

  // Stringify if object
  if (typeof errorData.error === 'object') {
    return JSON.stringify(errorData.error);
  }

  return fallback;
}

/**
 * Scrape URL and summarize with AI
 */
export async function scrapeAndSummarize(url: string) {
  // 1. Scrape the URL
  const scrapeResult = await scrape(url);

  const content = scrapeResult.data?.content || scrapeResult.content;
  const title = scrapeResult.data?.title || scrapeResult.title || url;

  if (!content) {
    throw new Error("No content found at URL");
  }

  // 2. Summarize with AI
  const prompt = `Summarize this article concisely. Include key points and main takeaways.

Title: ${title}
URL: ${url}

Content:
${content.slice(0, 15000)}

Provide a clear, structured summary with:
- One paragraph overview
- Key points (3-5 bullets)
- Main takeaway`;

  const chatResult = await chat(prompt);

  return {
    url,
    title,
    content,
    summary: chatResult.data?.response || chatResult.response,
  };
}
