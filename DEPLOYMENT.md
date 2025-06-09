# Deployment Guide

## Before Building for Production

1. Ensure favicon files are in the correct location:
   ```bash
   # The favicon files should be in client/public/
   ls client/public/
   # Should show: favicon.ico, favicon-16x16.png, favicon-32x32.png
   ```

2. Run the build command:
   ```bash
   npm run build
   ```

3. After building, manually copy favicon files to the dist directory:
   ```bash
   # Copy favicon files to the production build directory
   cp client/public/favicon* dist/public/
   ```

4. Verify the build includes the favicon files:
   ```bash
   ls dist/public/
   # Should include your favicon files along with other assets
   ```

## For Replit Deployment

The favicon should now display correctly when you deploy using Replit's deployment feature. The server is configured to serve static files from both the `public` directory (development) and `dist/public` directory (production).

## Troubleshooting

If the favicon still shows as "S":
1. Clear your browser cache
2. Check that favicon files exist in `dist/public/` after building
3. Verify the favicon URLs are accessible at `/favicon.ico`, `/favicon-16x16.png`, `/favicon-32x32.png`