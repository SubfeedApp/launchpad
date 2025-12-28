# Search AI Starter

Launch your own Perplexity-style AI search in 5 minutes.

## Features

- ✅ Real-time web search
- ✅ AI-generated summary
- ✅ Citations included
- ✅ Follow-up questions
- ✅ One-click Vercel deploy

## Setup

1. Create entity on [Subfeed Cloud](https://subfeed.app/cloud)
2. Copy API key + Entity ID
3. Clone this repo
4. `cp .env.example .env` and paste credentials
5. `npm install && npm run dev`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/search-ai&env=SUBFEED_API_KEY,SUBFEED_ENTITY_ID)

## Endpoints

| Method | Path             | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /search          | Search + AI summary |
| POST   | /search/followup | Follow-up questions |

## Usage

**Search:**

```bash
curl -X POST http://localhost:3000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the current price of Bitcoin?"}'
```
