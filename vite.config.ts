import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This option tells the dev server to use HTML5 history API fallback
    fs: {
      strict: false,
    },
  },
})
