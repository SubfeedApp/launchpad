# Subfeed Chat AI - Lovable Integration

## Step 1: Add Secrets in Lovable

Go to Settings → Secrets → Add:

- `VITE_SUBFEED_API_KEY` → Get from cloud.subfeed.app
- `VITE_SUBFEED_ENTITY_ID` → Get from cloud.subfeed.app

## Step 2: Paste This Prompt

Copy everything below and paste into Lovable:

---

Build a Chat AI app using Subfeed as the backend.

## API Client

Create `src/lib/subfeed.ts`:

```typescript
const API_URL = `https://api.subfeed.app/v1/entity/${
  import.meta.env.VITE_SUBFEED_ENTITY_ID
}`;
const API_KEY = import.meta.env.VITE_SUBFEED_API_KEY;

interface ChatResponse {
  response: string;
  token_estimate: number;
  timestamp: string;
}

export async function chat(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
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

export async function clearHistory(): Promise<{
  success: boolean;
  new_session_id: string;
}> {
  const res = await fetch(`${API_URL}/chat/history`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
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

- Message input with send button (disabled while loading)
- Send on Enter key, Shift+Enter for new line
- Chat history showing user/assistant bubbles
- Auto-scroll to latest message
- Loading spinner while waiting for response

### 2. Message Bubbles

- User messages: right-aligned, colored background
- Assistant messages: left-aligned, neutral background
- Timestamp on hover
- Copy button on each message

### 3. Markdown Support

- Render markdown in assistant responses
- Code blocks with syntax highlighting
- Copy button on code blocks

### 4. Header

- App title: "Chat AI"
- Clear history button (calls `clearHistory()`)
- Dark/light mode toggle

### 5. Empty State

- When no messages, show: "Start a conversation!"
- Suggested prompts: "Explain quantum computing", "Write a poem", "Help me code"

### 6. Error Handling

- Toast notification on API error
- Retry button on failed messages

### 7. Styling

- Modern, clean design
- Responsive (mobile-friendly)
- Smooth animations on new messages

---

## Test It

After building, test with:

- "Hello, how are you?"
- "Explain JavaScript closures"
- "Write a haiku about coding"
