import 'dotenv/config';
import express from 'express';
import chatRouter from './routes/chat.js';
import handoffRouter from './routes/handoff.js';
import leadsRouter from './routes/leads.js';

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/chat', chatRouter);
app.use('/handoff', handoffRouter);
app.use('/leads', leadsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Support AI running on port ${PORT}`);
});
