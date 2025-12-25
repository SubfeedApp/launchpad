# Legal AI Starter

Launch your own legal AI in 5 minutes. Based on a legal AI company valued at $715M.

## Setup

1. Create entity on [Subfeed Cloud](https://cloud.subfeed.app)
2. Copy API key + Entity ID
3. Clone this repo
4. `cp .env.example .env` and paste credentials
5. `npm install && npm run dev`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/legal-ai&env=SUBFEED_API_KEY,SUBFEED_ENTITY_ID)

## Endpoints

| Method | Path              | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | /chat             | General legal chat           |
| POST   | /analyze-contract | Analyze pasted contract text |

## Features

- ✅ Auto-citations
- ✅ Confidence scoring
- ✅ Legal disclaimers
- ✅ Contract analysis (paste text)
- ✅ Session memory

## Usage

**Chat:**

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What does Section 1542 mean?"}'
```

**Analyze Contract:**

```bash
curl -X POST http://localhost:3000/analyze-contract \
  -H "Content-Type: application/json" \
  -d '{"contract_text": "This Agreement is entered into..."}'
```
