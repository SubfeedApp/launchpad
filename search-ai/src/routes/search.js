import express from 'express';
import { performWebSearch } from '../lib/subfeed.js';
import { processSearchResponse } from '../lib/processor.js';

const router = express.Router();

/**
 * POST /search
 * Perplexity-style search with AI summary
 */
router.post('/', async (req, res) => {
  const { query, max_results, topic, time_range, search_depth, include_answer } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  const entityId = process.env.SUBFEED_ENTITY_ID;
  
  try {
    const response = await performWebSearch(entityId, { query, max_results, topic, time_range, search_depth, include_answer });
    const processed = processSearchResponse(response);
    return res.json(processed);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
