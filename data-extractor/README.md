# Data Extractor AI

Extract clean, structured content from any URL.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/data-extractor&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. Enable `web_extract` addon
3. Copy API key + Entity ID
4. Deploy to Vercel

## Features

- Extract from any URL
- Multiple formats (Markdown, Text, HTML)
- Copy to clipboard
- Download extracted content
- Recent history
- Mobile responsive

## Output Formats

| Format | Description | Use Case |
|--------|-------------|----------|
| Markdown | Clean, formatted | Documentation, notes |
| Text | Raw content | Processing, analysis |
| HTML | Structured markup | Preserving structure |

## Local Dev

```bash
npm install
cp .env.example .env.local
# Add your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Required Addon

This template requires the `web_extract` addon enabled on your entity.

## Stack

- Next.js 14
- Tailwind CSS
- shadcn/ui
- Subfeed Cloud (Firecrawl)
