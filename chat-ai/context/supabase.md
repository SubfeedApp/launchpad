# Subfeed Chat AI - Supabase Integration (Optional)

## When You Need This

- User accounts / auth
- Persistent chat history beyond Subfeed sessions
- Custom analytics

## Note

Subfeed already handles AI memory and sessions. Only add Supabase if you need user auth or long-term storage.

## Setup

1. Create Supabase project
2. Add to `.env`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
