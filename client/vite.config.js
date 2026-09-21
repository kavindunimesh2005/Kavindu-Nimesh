import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  // When deploying to GitHub Pages (repository 'Kavindu-Nimesh') or via GitHub Actions,
  // assets must be prefixed with '/Kavindu-Nimesh/' so they don't 404 on the root domain.
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';
  const basePath = process.env.VITE_BASE_PATH || (isGitHubPages ? '/Kavindu-Nimesh/' : '/');

  return {
    base: basePath,
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true
        },
        '/uploads': {
          target: 'http://localhost:5001',
          changeOrigin: true
        }
      }
    }
  };
});
