# Subfeed Legal AI - Supabase Integration (Optional)

## When You Need This

- Store user accounts for law firms
- Save document history long-term
- Multi-tenant support

## Note

Subfeed already handles AI memory and sessions. Only add Supabase for user auth or document storage.

## Setup

1. Create Supabase project
2. Add to `.env`:

   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

3. Create tables:

```sql
create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  title text,
  content text,
  analysis jsonb,
  created_at timestamp default now()
);
```
