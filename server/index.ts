import express from 'express';
import { createServer } from 'http';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import routes from './routes';

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (favicon, etc.)
app.use(express.static('public'));

// API Routes
app.use('/api', routes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (process.env.NODE_ENV === 'development') {
    // Development mode with Vite
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    
    app.use(vite.middlewares);
  } else {
    // Production mode - serve built files
    app.use(express.static('dist/public'));
  }
  
  const server = createServer(app);
  
  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

export { app as default, routes };