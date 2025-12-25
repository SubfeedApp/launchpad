# Subfeed Legal AI - Pinecone Integration (Optional)

## When You Need This

- Build knowledge base from legal documents
- Semantic search across case law
- RAG for legal research

## Setup

Use via Subfeed Actions:

```bash
curl -X POST https://api.subfeed.app/v1/entity/{id}/actions/vector_search \
  -H "Authorization: Bearer sk_..." \
  -d '{"params": {"query": "Section 1542 waiver", "api_key": "...", "index_name": "legal-docs"}}'
```
