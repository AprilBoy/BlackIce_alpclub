import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BlackIce_alpclub/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
  },
})
