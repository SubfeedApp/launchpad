import express from 'express';
import { sendChatMessage } from '../lib/subfeed.js';
import { processLegalResponse } from '../lib/processor.js';
import { SYSTEM_PROMPT } from '../prompts/systemPrompt.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { message, sessionId, model } = req.body;

    // Validate required fields
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'Missing or invalid "message" field. Message must be a non-empty string.',
      });
    }

    const entityId = process.env.SUBFEED_ENTITY_ID;
    const fullPrompt = SYSTEM_PROMPT + message;

    // Send to Subfeed API
    const response = await sendChatMessage(entityId, fullPrompt, sessionId, model);

    // Process response
    const processedResponse = processLegalResponse(response);

    res.json({
      ...processedResponse,
      sessionId: response.sessionId,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    const response = {
      error: error.message || 'Failed to process chat message',
    };

    if (error.apiError) {
      response.details = error.apiError;
    }

    res.status(statusCode).json(response);
  }
});

export default router;
