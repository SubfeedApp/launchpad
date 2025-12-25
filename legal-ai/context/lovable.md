# Subfeed Legal AI - Lovable Integration

## Step 1: Add Secrets in Lovable

Go to Settings → Secrets → Add:

- `VITE_SUBFEED_API_KEY` → Get from cloud.subfeed.app
- `VITE_SUBFEED_ENTITY_ID` → Get from cloud.subfeed.app

## Step 2: Paste This Prompt

Copy everything below and paste into Lovable:

---

Build a Legal AI app using Subfeed as the backend.

## API Client

Create `src/lib/subfeed.ts`:

```typescript
const API_URL = `https://api.subfeed.app/v1/entity/${
  import.meta.env.VITE_SUBFEED_ENTITY_ID
}`;
const API_KEY = import.meta.env.VITE_SUBFEED_API_KEY;

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
    throw new Error(`API Error: ${res.status}`);
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
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
```

## UI Requirements

Build these components:

### 1. Chat Interface

- Message input with send button
- Chat history showing user/assistant messages
- Loading spinner while waiting for response
- Error toast on failure

### 2. Citations Sidebar

- Collapsible panel on the right
- List all `citations` from response
- Each citation is clickable (just highlight for now)

### 3. Confidence Badge

- Show above each AI response
- HIGH = green badge
- MEDIUM = yellow badge
- LOW = red badge

### 4. Legal Disclaimer

- Fixed footer on every AI response
- Text: "⚠️ This is legal information, not legal advice."

### 5. Contract Analysis Tab

- Second tab next to Chat
- Large textarea to paste contract
- "Analyze" button
- Shows same response format (citations, confidence, disclaimer)

### 6. Styling

- Professional law firm aesthetic
- Dark mode support
- Responsive design

---

## Test It

After building, test with:

- Chat: "What does Section 1542 mean?"
- Contract: Paste any contract text and click Analyze
