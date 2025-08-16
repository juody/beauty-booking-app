import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// حل مشكلة 404 عند تحديث الصفحة
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true
  }
});
