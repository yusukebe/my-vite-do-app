import { cloudflare } from '@cloudflare/vite-plugin'
import build from '@hono/vite-build/cloudflare-workers'
import { defaultOptions } from '@hono/vite-build/cloudflare-workers'
import { defineConfig } from 'vite'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'

export default defineConfig(({ command, isSsrBuild }) => {
  if (command === 'serve') {
    return { plugins: [ssrHotReload(), cloudflare()] }
  }
  if (!isSsrBuild) {
    return {
      build: {
        rollupOptions: {
          input: ['./src/style.css'],
          output: {
            assetFileNames: 'assets/[name].[ext]'
          }
        }
      }
    }
  }
  return {
    build: {
      rollupOptions: {
        external: ['cloudflare:workers']
      }
    },
    plugins: [
      build({
        outputDir: 'dist-server',
        minify: false,
        entryContentAfterHooks: [
          ...(defaultOptions.entryContentAfterHooks ?? []),
          () => {
            // Forcing to export the Counter class.
            return `export { Counter } from './src/index.tsx'`
          }
        ]
      })
    ]
  }
})
