# Subfeed Legal AI - Bolt Integration

## Step 1: Environment Setup

Add to `.env`:

```
SUBFEED_API_KEY=sk_live_xxxxx
SUBFEED_ENTITY_ID=ent_xxxxx
```

Get both from https://cloud.subfeed.app

## Step 2: Paste This Prompt

Copy everything below and paste into Bolt:

---

Build a Legal AI app using Subfeed as the backend.

## API Client

Create `src/lib/subfeed.ts`:

```typescript
const API_URL = `https://api.subfeed.app/v1/entity/${process.env.SUBFEED_ENTITY_ID}`;
const API_KEY = process.env.SUBFEED_API_KEY;

interface LegalResponse {
  response: string;
  citations: string[];
  confidence: "high" | "medium" | "low";
  disclaimer_shown: boolean;
}

export async function chat(
  message: string,
  sessionId?: string
): Promise<LegalResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export async function analyzeContract(text: string): Promise<LegalResponse> {
  const res = await fetch(`${API_URL}/analyze-contract`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contract_text: text }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}
```

## UI Requirements

Build these pages/components:

### 1. Chat Page (`/`)

- Message input + send button
- Chat history (user/assistant bubbles)
- Loading state while fetching
- Error handling with toast notifications

### 2. Citations Panel

- Right sidebar (collapsible)
- Shows all `citations[]` from response
- Visual list with bullet points

### 3. Confidence Indicator

- Badge above each AI response
- Colors: HIGH=green, MEDIUM=yellow, LOW=red

### 4. Disclaimer Banner

- Appears below every AI response
- "⚠️ This is legal information, not legal advice."

### 5. Contract Analysis Page (`/analyze`)

- Large textarea for pasting contract
- "Analyze Contract" button
- Same response display (citations, confidence, disclaimer)

### 6. Navigation

- Tab or nav between Chat and Analyze

### 7. Styling

- Clean, professional design
- Dark mode toggle
- Mobile responsive

---

## Test Commands

```bash
# Test chat
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Section 1542?"}'

# Test analyze
curl -X POST http://localhost:3000/analyze-contract \
  -H "Content-Type: application/json" \
  -d '{"contract_text": "This Agreement is entered into..."}'
```
