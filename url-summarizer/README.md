# URL Summarizer AI

AI that reads any URL and summarizes it instantly.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/url-summarizer&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. Enable `web_extract` addon
3. Copy API key + Entity ID
4. Deploy to Vercel

## Features

- Paste any URL
- Extracts clean content
- AI-generated summary
- Copy summary
- Recent history
- Mobile responsive

## Local Dev

```bash
npm install
cp .env.example .env.local
# Add your credentials
npm run dev
```

Open http://localhost:3000

## Required Addon

This template requires the `web_extract` addon enabled on your entity.

## Stack

- Next.js 14
- Tailwind CSS
- shadcn/ui
- Subfeed Cloud
