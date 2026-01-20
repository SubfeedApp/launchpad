import type { ScrapeResult, SummaryResult } from "@/types/summarizer";

const SUBFEED_API = "https://api.subfeed.app";
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
 * Scrape a URL using Subfeed's web_extract action
 * Note: Requires web_extract action to be enabled on the entity
 */
export async function scrape(url: string): Promise<ScrapeResult> {
  const res = await fetch(
    `${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/actions/web_extract`,
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

  if (!res.ok) {
    throw new Error(`Subfeed scrape error: ${res.status}`);
  }

  const data = await res.json();
  return {
    url,
    title: data.data?.title || "Untitled",
    content: data.data?.content || "",
  };
}

/**
 * Scrape a URL and summarize the content
 */
export async function scrapeAndSummarize(url: string): Promise<SummaryResult> {
  // Step 1: Scrape the URL
  const scraped = await scrape(url);

  // Step 2: Summarize the content using chat
  const prompt = `Summarize the following content from "${scraped.title}":

${scraped.content}

Provide a clear, concise summary highlighting the key points. Use markdown formatting.`;

  const chatResult = await chat(prompt);
  const summary = chatResult.data?.response || "Unable to generate summary.";

  return {
    ...scraped,
    summary,
  };
}
