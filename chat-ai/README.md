# Chat AI Starter

Launch your own AI chat app in 5 minutes. The simplest starting point for any AI application.

## Setup

1. Create entity on [Subfeed Cloud](https://subfeed.app/cloud)
2. Copy API key + Entity ID
3. Clone this repo
4. `cp .env.example .env` and paste credentials
5. `npm install && npm run dev`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/chat-ai&env=SUBFEED_API_KEY,SUBFEED_ENTITY_ID)

## Endpoints

| Method | Path                       | Description   |
| ------ | -------------------------- | ------------- |
| POST   | /chat                      | Send message  |
| GET    | /chat/histories/:sessionId | Get history   |
| DELETE | /chat/histories/:sessionId | Clear session |

## Features

- ✅ General-purpose chat
- ✅ Markdown formatting
- ✅ Session memory

## Usage

**Chat:**

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

**Clear History:**

```bash
curl -X DELETE http://localhost:3000/history
```
