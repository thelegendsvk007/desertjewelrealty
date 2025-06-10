import { Router } from 'express';

const router = Router();

// Simple health check endpoint
router.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;