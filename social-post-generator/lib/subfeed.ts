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
 * Generate social post
 */
export async function generate(topic: string, platformPrompt: string) {
  const prompt = `${platformPrompt}

Topic: ${topic}

Generate only the post, no explanation or preamble.`;

  return chat(prompt);
}
