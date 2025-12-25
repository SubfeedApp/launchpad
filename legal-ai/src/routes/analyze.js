import express from 'express';
import { sendChatMessage } from '../lib/subfeed.js';
import { processLegalResponse } from '../lib/processor.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { contract_text, sessionId } = req.body;

    // Validate required fields
    if (!contract_text || typeof contract_text !== 'string' || contract_text.trim() === '') {
      return res.status(400).json({
        error: 'Missing or invalid "contract_text" field. Contract text must be a non-empty string.',
      });
    }

    const entityId = process.env.SUBFEED_ENTITY_ID;
    const analysisPrompt = 'Analyze this contract:\n\n' + contract_text;

    // Send to Subfeed API
    const response = await sendChatMessage(entityId, analysisPrompt, sessionId);

    // Process response
    const processedResponse = processLegalResponse(response);

    res.json({
      ...processedResponse,
      sessionId: response.sessionId,
    });
  } catch (error) {
    const statusCode = error.status || 500;
    const response = {
      error: error.message || 'Failed to analyze contract',
    };

    if (error.apiError) {
      response.details = error.apiError;
    }

    res.status(statusCode).json(response);
  }
});

export default router;
