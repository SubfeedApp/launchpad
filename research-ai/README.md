# Research AI

Perplexity-style AI search. Built on Subfeed.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/research-ai&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. Enable `web_search` action
3. Copy API key + Entity ID
4. Deploy to Vercel

## Features

- ✅ Real-time web search
- ✅ AI-generated answers
- ✅ Source citations
- ✅ Follow-up questions
- ✅ Mobile responsive

## Local Dev

```bash
npm install
cp .env.example .env.local
# Add your credentials
npm run dev
