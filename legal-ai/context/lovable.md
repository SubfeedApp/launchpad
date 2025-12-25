# Subfeed Legal AI - Lovable Integration

## Setup

1. Add `SUBFEED_API_KEY` and `SUBFEED_ENTITY_ID` to Lovable secrets
2. Paste this prompt into Lovable:

---

"You are building a Legal AI app powered by Subfeed.

API: `https://api.subfeed.app/v1/entity/{ENTITY_ID}/chat`
Auth: Bearer token from secrets.

Create a `lib/subfeed.ts` client that:

- Sends POST to `/chat` with `{ message, session_id }`
- Parses response for `citations`, `confidence`, `disclaimer_shown`

Build a professional legal research UI with:

- Chat interface with message history
- Citations sidebar (collapsible, shows sources)
- Confidence badge (HIGH = green, MEDIUM = yellow, LOW = red)
- Legal disclaimer footer on every response
- Contract analysis tab (textarea to paste contract text)
- Dark mode support
- Professional law firm aesthetic"

---

## OpenAPI Spec

https://subfeed.app/openapi.json
