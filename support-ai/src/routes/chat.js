import express from 'express';
import { sendChatMessage } from '../lib/subfeed.js';
import { processSupportResponse } from '../lib/processor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, session_id } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }
  
  const entityId = process.env.SUBFEED_ENTITY_ID;

  try {
    const response = await sendChatMessage(entityId, message, session_id);
    const processed = processSupportResponse(response, message);
    
    return res.json({
      ...processed,
      session_id: response.session_id || session_id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
