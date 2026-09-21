import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const routes = [
  'projects',
  'projects/bharana-books',
  'projects/ayu-care-ceylon',
  'projects/aura-logistics-os',
  'projects/apex-capital-analytics',
  'admin',
  'admin/login',
  'admin/about',
  'admin/projects',
  'admin/services',
  'admin/skills',
  'admin/experience',
  'admin/testimonials',
  'admin/messages',
  'admin/settings'
];

const indexContent = fs.readFileSync(indexPath, 'utf8');

// Copy 404.html for any unlisted route
fs.writeFileSync(path.join(distDir, '404.html'), indexContent, 'utf8');

// Generate static route files so GitHub Pages serves them directly with 200 OK instead of 404
routes.forEach((route) => {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent, 'utf8');
});

console.log(`✅ Generated static route pages for ${routes.length} SPA routes in dist/`);
