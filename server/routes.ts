import { Router } from 'express';

const router = Router();

const GROWTH_API = 'https://autonomous-workforce.replit.app';

// Admin credentials - change these to your own
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Simple session store
const sessions: Record<string, { username: string; role: string }> = {};

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessions[sessionId] = { username, role: 'admin' };
    res.cookie('session', sessionId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ id: 1, username, role: 'admin' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

router.get('/user', (req, res) => {
  const sessionId = req.cookies?.session;
  if (sessionId && sessions[sessionId]) {
    res.json({ id: 1, ...sessions[sessionId] });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

router.post('/logout', (req, res) => {
  const sessionId = req.cookies?.session;
  if (sessionId) delete sessions[sessionId];
  res.clearCookie('session');
  res.json({ message: 'Logged out' });
});

// Properties from Growth Engine
router.get('/properties', async (req, res) => {
  try {
    const response = await fetch(`${GROWTH_API}/api/public/properties`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json([]);
  }
});

router.get('/properties/:id', async (req, res) => {
  try {
    const response = await fetch(`${GROWTH_API}/api/public/properties/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
});

// Developers endpoint
router.get('/developers', (req, res) => {
  res.json([]);
});

export default router;
