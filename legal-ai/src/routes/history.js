import express from 'express';
import { listSessions, getChatHistory, clearHistory } from '../lib/subfeed.js';
import { processLegalResponse } from '../lib/processor.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Page and limit must be positive integers',
      });
    }

    const entityId = process.env.SUBFEED_ENTITY_ID;

    // Get sessions from Subfeed API
    const sessions = await listSessions(entityId, page, limit);

    res.json(sessions);
  } catch (error) {
    const statusCode = error.status || 500;
    const response = {
      error: error.message || 'Failed to retrieve session history',
    };

    if (error.apiError) {
      response.details = error.apiError;
    }

    res.status(statusCode).json(response);
  }
});

router.get('/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  try {
    const response = await getChatHistory(process.env.SUBFEED_ENTITY_ID, sessionId);
    // Process messages in history: format assistant responses like clients receive them
    if (response.data?.messages && Array.isArray(response.data?.messages)) {
      response.data.messages = response.data.messages.map(message => {
        if (message.role === 'assistant') {
          // Process the assistant message through legal response formatter
          const processed = processLegalResponse(message.content);
          return {
            ...message,
            content: processed.response,
            citations: processed.citations,
            confidence: processed.confidence,
            disclaimer_shown: processed.disclaimer_shown
          };
        }
        return message;
      });
    }

    return res.json(response);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
});

router.delete('/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  try {
    const response = await clearHistory(process.env.SUBFEED_ENTITY_ID, sessionId);
    return res.json({ success: true, data: response });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
});

export default router;
