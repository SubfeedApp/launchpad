# Support AI Starter

Launch your own AI support widget in 5 minutes. Intercom alternative powered by Subfeed.

## Setup

1. Create entity on [Subfeed Cloud](https://subfeed.app/cloud)
2. Copy API key + Entity ID
3. Clone this repo
4. `cp .env.example .env` and paste credentials
5. `npm install && npm run dev`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/support-ai&env=SUBFEED_API_KEY,SUBFEED_ENTITY_ID)

## Endpoints

| Method | Path     | Description                    |
| ------ | -------- | ------------------------------ |
| POST   | /chat    | Support chat with escalation   |
| POST   | /handoff | Trigger handoff + capture lead |
| GET    | /leads   | Get captured leads             |

## Features

- ✅ AI chat resolution
- ✅ Human handoff detection
- ✅ Lead capture (email extraction)
- ✅ Quick reply suggestions
- ✅ Sentiment detection
- ✅ Session memory
- ✅ One-click Vercel deploy

## Response Schema

```typescript
interface SupportResponse {
  response: string;
  escalation: boolean;
  escalation_reason: string | null;
  extracted_email: string | null;
  sentiment: "positive" | "neutral" | "negative";
  quick_replies: string[];
}
```
