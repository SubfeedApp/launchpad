# Subfeed Chat AI - Bolt Integration

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

Build a Chat AI app using Subfeed as the backend.

## API Client

Create `src/lib/subfeed.ts`:

```typescript
const API_URL = `https://api.subfeed.app/v1/entity/${process.env.SUBFEED_ENTITY_ID}`;
const API_KEY = process.env.SUBFEED_API_KEY;

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
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
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
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}
```

## UI Requirements

Build these pages/components:

### 1. Chat Page (`/`)

- Full-height chat interface
- Message input fixed at bottom
- Send button + Enter key to send
- Shift+Enter for new line

### 2. Message List

- Scrollable message history
- User messages: right side, blue background
- Assistant messages: left side, gray background
- Auto-scroll to bottom on new message

### 3. Message Features

- Markdown rendering (use react-markdown or similar)
- Code syntax highlighting (use highlight.js or prism)
- Copy button on each message
- Copy button on code blocks
- Timestamp tooltip

### 4. Header Bar

- Title: "Chat AI"
- Clear history button (with confirmation modal)
- Theme toggle (dark/light)

### 5. Loading States

- Typing indicator while waiting for response
- Disabled input while loading
- Skeleton loader for initial load

### 6. Error Handling

- Toast notifications for errors
- Retry button on failed messages
- Graceful fallback UI

### 7. Empty State

- Friendly message: "Start chatting!"
- 3-4 example prompts as clickable chips

### 8. Responsive Design

- Works on mobile and desktop
- Collapsible sidebar (if any)
- Touch-friendly buttons

---

## Test Commands

```bash
# Test chat
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Clear history
curl -X DELETE http://localhost:3000/chat/history
```
