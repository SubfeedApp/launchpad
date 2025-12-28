import express from 'express';

const router = express.Router();

// In-memory leads store (use Supabase for persistence)
export const leads = [];

router.get('/', async (req, res) => {
  const { limit = 50, offset = 0 } = req.query;
  
  const paginatedLeads = leads
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(Number(offset), Number(offset) + Number(limit));
  
  return res.json({
    leads: paginatedLeads,
    total: leads.length,
    limit: Number(limit),
    offset: Number(offset),
  });
});

export default router;
