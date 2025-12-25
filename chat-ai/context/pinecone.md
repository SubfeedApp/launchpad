# Subfeed Chat AI - Pinecone Integration (Optional)

## When You Need This

- Knowledge base / RAG
- Semantic search

## Note

Use Subfeed Actions `vector_search` first. Add Pinecone directly only for advanced use cases.

## Setup

Use via Subfeed Actions:

```bash
curl -X POST https://api.subfeed.app/v1/entity/{id}/actions/vector_search \
  -H "Authorization: Bearer sk_..." \
  -d '{"params": {"query": "...", "api_key": "...", "index_name": "..."}}'
```
