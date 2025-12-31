# Subfeed + Vercel AI Chat

Working AI chat in 2 minutes. Built with [Vercel AI SDK](https://sdk.vercel.ai/docs).

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/vercel-ai-chat&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. Click deploy button above
3. Add environment variables:
   - `SUBFEED_ENTITY_ID` - Your entity ID
   - `SUBFEED_API_KEY` - Your API key (starts with `sf_live_`)
4. Done - your chat app is live!

## Local Dev

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

| Layer | Technology |
|-------|------------|
| Chat UI | React + Tailwind CSS |
| Chat Logic | `useChat()` from Vercel AI SDK |
| Hosting | Vercel |
| AI Backend | Subfeed API |

## References

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Subfeed API](https://api.subfeed.app/docs)
