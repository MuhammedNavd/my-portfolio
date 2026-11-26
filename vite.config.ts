import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves the project under /<repo>/, Workers serves it at the root.
  base: process.env.GITHUB_PAGES ? '/naveed-field-log/' : '/',
  plugins: [react(), tailwindcss(), cloudflare()],
  server: { port: 5360, strictPort: false },
})
