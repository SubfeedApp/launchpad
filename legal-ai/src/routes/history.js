import express from 'express';
import { listSessions } from '../lib/subfeed.js';

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

export default router;
