import express from 'express';
import { leads } from './leads.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { session_id, email, reason } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
  
  const lead = {
    id: crypto.randomUUID(),
    email,
    session_id: session_id || null,
    escalation_reason: reason || 'human_request',
    created_at: new Date().toISOString(),
  };
  
  leads.push(lead);
  
  console.log('New lead captured:', lead);
  
  return res.json({ success: true, lead_id: lead.id });
});

export default router;
