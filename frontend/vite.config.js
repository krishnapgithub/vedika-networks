import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prosperaTitle, prosperaUrl, prosperaMeta } from './src/prosperaMetadata.js'

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function prosperaSharingPage() {
  return {
    name: 'prospera-sharing-page',
    enforce: 'post',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html']
        if (!index || typeof index.source !== 'string') throw new Error('Missing built index.html')
        const tags = prosperaMeta.map(([attribute, key, content]) =>
          `<meta data-prospera-meta ${attribute}="${key}" content="${escapeHtml(content)}" />`
        ).join('\n    ')
        const html = index.source.replace(/<title>(.*?)<\/title>/, (_match, title) =>
          `<title data-original-title="${escapeHtml(title)}">${prosperaTitle}</title>`
        ).replace('</head>', `    ${tags}\n    <link data-prospera-meta rel="canonical" href="${prosperaUrl}" />\n  </head>`)
        // Cloudflare's default HTML handling serves prospera.html at /prospera.
        this.emitFile({ type: 'asset', fileName: 'prospera.html', source: html })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prosperaSharingPage()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/index.css'
          }

          return 'assets/[name][extname]'
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
