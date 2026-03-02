#!/usr/bin/env node
import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('Starting build process...');

// Run the main build command
console.log('Building application...');
execSync('vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
  cwd: rootDir,
  stdio: 'inherit'
});

// Ensure favicon files are copied to dist/public
console.log('Copying favicon files...');
const distPublicDir = join(rootDir, 'dist', 'public');
if (!existsSync(distPublicDir)) {
  mkdirSync(distPublicDir, { recursive: true });
}

// Copy favicon files
const faviconFiles = ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png'];
faviconFiles.forEach(file => {
  const srcPath = join(rootDir, 'client', 'public', file);
  const destPath = join(distPublicDir, file);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to dist/public/`);
  }
});

console.log('Build process completed successfully!');