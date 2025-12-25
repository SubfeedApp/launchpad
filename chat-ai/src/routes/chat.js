import express from 'express';
import { sendChatMessage, clearHistory, getChatHistory } from '../lib/subfeed.js';
import { processChatResponse } from '../lib/processor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }
  
  try {
    const response = await sendChatMessage(process.env.SUBFEED_ENTITY_ID, message, sessionId);
    const processed = processChatResponse(response);
    return res.json(processed);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/histories/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  try {
    const response = await getChatHistory(process.env.SUBFEED_ENTITY_ID, sessionId);
    return res.json(response);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
});

router.delete('/histories/:sessionId', async (req, res) => {
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