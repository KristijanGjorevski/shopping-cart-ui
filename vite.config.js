import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',// we are redirecting to our backend
        rewrite: (path) => { return path.replace(/^\/api/, '') },
        changeOrigin: true,

      }
    }
  }
})