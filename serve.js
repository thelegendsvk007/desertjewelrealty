import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;
const STATIC_DIR = join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = createServer(async (req, res) => {
  try {
    let filePath = join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Check if file exists
    try {
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        filePath = join(filePath, 'index.html');
      }
    } catch {
      // If file doesn't exist, serve index.html for SPA routing
      filePath = join(STATIC_DIR, 'index.html');
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on http://0.0.0.0:${PORT}`);
});