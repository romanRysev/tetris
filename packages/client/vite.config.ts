import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  ssr: {
    target: 'node',
    format: 'cjs',
  },
  plugins: [
    react(),
    // eslint-disable-next-line new-cap
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{ts,tsx,scss,html,ico,png,svg,jpg,js,css}'],
      },
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
    }),
  ],
});
