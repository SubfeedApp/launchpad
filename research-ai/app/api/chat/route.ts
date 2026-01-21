import { createDataStreamResponse, formatDataStreamPart } from 'ai';

const SUBFEED_API = 'https://api.subfeed.app';
const SUBFEED_KEY = process.env.SUBFEED_API_KEY;
const SUBFEED_ENTITY_ID = process.env.SUBFEED_ENTITY_ID;

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();
    const message = messages[messages.length - 1]?.content;

    const res = await fetch(`${SUBFEED_API}/v1/entity/${SUBFEED_ENTITY_ID}/chat`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUBFEED_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        model, // Pass model override
      }),
    });

    const data = await res.json();
    const responseText = data.data?.response || 'Sorry, I could not process your request.';

    return createDataStreamResponse({
      execute: async (dataStream) => {
        dataStream.write(formatDataStreamPart('text', responseText));
      },
    });
  } catch (error) {
    return createDataStreamResponse({
      execute: async (dataStream) => {
        dataStream.write(formatDataStreamPart('text', 'Sorry, service temporarily unavailable.'));
      },
    });
  }
}
