import { Router, Request, Response } from 'express';

const router = Router();

// Admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Safiyan@201299';

// In-memory session storage
const sessions: Map<string, { userId: number; username: string; role: string }> = new Map();

// Generate a simple session ID
function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Simple health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Login endpoint
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const sessionId = generateSessionId();
    const user = { userId: 1, username: ADMIN_USERNAME, role: 'admin' };
    sessions.set(sessionId, user);
    
    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({ id: user.userId, username: user.username, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Logout endpoint
router.post('/logout', (req: Request, res: Response) => {
  const sessionId = req.cookies?.sessionId;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie('sessionId');
  res.json({ message: 'Logged out successfully' });
});

// Get current user endpoint
router.get('/user', (req: Request, res: Response) => {
  const sessionId = req.cookies?.sessionId;
  
  if (sessionId && sessions.has(sessionId)) {
    const user = sessions.get(sessionId)!;
    res.json({ id: user.userId, username: user.username, role: user.role });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default router;