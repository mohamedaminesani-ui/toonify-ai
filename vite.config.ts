import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages (projet) : base doit valoir '/<nom-du-repo>/'.
// Repo nommé "toonify-ai" -> URL : https://mohamedaminesani-ui.github.io/toonify-ai/
// Si tu renommes le repo, change la valeur ci-dessous.
export default defineConfig({
  plugins: [react()],
  base: '/toonify-ai/',
})
