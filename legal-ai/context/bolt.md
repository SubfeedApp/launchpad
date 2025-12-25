# Subfeed Legal AI - Bolt Integration

## Setup Prompt

Paste this into Bolt:

---

"Set up a Subfeed Legal AI integration.

1. Add to `.env`:

   - `SUBFEED_API_KEY`
   - `SUBFEED_ENTITY_ID`

2. Create `src/lib/subfeed.ts`:

```typescript
const SUBFEED_URL = `https://api.subfeed.app/v1/entity/${process.env.SUBFEED_ENTITY_ID}`;

export async function chat(message: string, sessionId?: string) {
  const res = await fetch(`${SUBFEED_URL}/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SUBFEED_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  return res.json();
}

export async function analyzeContract(contractText: string) {
  const res = await fetch(`${SUBFEED_URL}/analyze-contract`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SUBFEED_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contract_text: contractText }),
  });
  return res.json();
}
```

3. Build UI with:
   - Document viewer for contracts
   - Citations panel with source links
   - Confidence indicator (HIGH/MEDIUM/LOW)
   - Legal disclaimer banner"

---

## API Reference

@https://subfeed.app/llms.txt
