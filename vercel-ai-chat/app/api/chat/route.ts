import { createDataStreamResponse, formatDataStreamPart } from 'ai';

const SUBFEED_URL = `https://api.subfeed.app/v1/entity/${process.env.SUBFEED_ENTITY_ID}/chat`;
const SUBFEED_KEY = process.env.SUBFEED_API_KEY;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const message = messages[messages.length - 1]?.content;

  // Call Subfeed API
  const res = await fetch(SUBFEED_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUBFEED_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  const responseText = data.data?.response || 'Sorry, I could not process your request.';

  // Return as AI SDK data stream format
  return createDataStreamResponse({
    execute: async (dataStream) => {
      dataStream.write(formatDataStreamPart('text', responseText));
    },
  });
}
