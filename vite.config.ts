import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/** Emits robots.txt and sitemap.xml at build time from VITE_SITE_URL, so every absolute URL has one source. */
function seoFiles(siteUrl: string): Plugin {
  const today = new Date().toISOString().slice(0, 10)
  return {
    name: 'navix-seo-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${siteUrl}/og-image.png</image:loc></image:image>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || 'https://navix.agency').replace(/\/$/, '')
  if (!env.VITE_SITE_URL) process.env.VITE_SITE_URL = siteUrl

  return {
    plugins: [tailwindcss(), react(), seoFiles(siteUrl)],
  }
})
