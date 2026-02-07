import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Tailwind is handled via PostCSS (postcss.config.cjs)
  ],
})
