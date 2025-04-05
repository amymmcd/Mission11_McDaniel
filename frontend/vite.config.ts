import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ✅ Important for deployment! (according to chatGPT)
  plugins: [react()],
  server: {
    port: 3000,
  },
});
