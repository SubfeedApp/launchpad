# Subfeed URL Summarizer

Summarize any URL with AI in seconds. Built with [Subfeed](https://subfeed.app).

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SubfeedApp/launchpad/tree/main/url-summarizer&env=SUBFEED_ENTITY_ID,SUBFEED_API_KEY)

## Setup

1. Create entity at [cloud.subfeed.app](https://cloud.subfeed.app)
2. **Enable the `web_scrape` action** on your entity
3. Click deploy button above
4. Add environment variables:
   - `SUBFEED_ENTITY_ID` - Your entity ID
   - `SUBFEED_API_KEY` - Your API key (starts with `sf_live_`)
5. Done - your summarizer is live!

## Local Dev

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. User pastes a URL
2. App calls Subfeed's `web_scrape` action to extract content
3. App calls Subfeed's chat API to summarize the content
4. Summary is displayed with markdown formatting

## Stack

| Layer | Technology |
|-------|------------|
| UI | React + Tailwind CSS |
| Scraping | Subfeed `web_scrape` action |
| Summarization | Subfeed chat API |
| Hosting | Vercel |

## References

- [Subfeed API](https://api.subfeed.app/docs)
- [Subfeed Cloud](https://cloud.subfeed.app)
