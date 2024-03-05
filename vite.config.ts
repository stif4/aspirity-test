import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/aspirity-test',
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
