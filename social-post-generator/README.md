# Social Post Generator AI

AI that writes viral posts for X, LinkedIn, Threads, and Facebook.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/social-post-generator&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. Copy API key + Entity ID
3. Deploy to Vercel

## Features

- Generate for X, LinkedIn, Threads, Facebook
- Platform-optimized prompts
- Character count validation
- One-click copy
- Regenerate individual posts
- Mobile responsive

## Local Dev

```bash
npm install
cp .env.example .env.local
# Add your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Platforms

| Platform | Style | Max Length |
| -------- | ----- | ---------- |
| X | Punchy, viral, line breaks | 280 chars |
| LinkedIn | Professional, value-driven | 3,000 chars |
| Threads | Conversational, authentic | 500 chars |
| Facebook | Friendly, community-focused | 63,206 chars |

## Stack

- Next.js 14
- Tailwind CSS
- shadcn/ui
- Subfeed Cloud
