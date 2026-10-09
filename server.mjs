import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT || 4321)

function serialize(state) {
  return JSON.stringify(state).replace(/</g, '\\u003c')
}

async function start() {
  const app = express()
  /** @type {import('vite').ViteDevServer | undefined} */
  let vite

  if (!isProd) {
    const { createServer } = await import('vite')
    vite = await createServer({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.join(root, 'dist/client'), { index: false }))
  }

  app.use(async (req, res, next) => {
    try {
      const url = req.originalUrl
      const templatePath = isProd
        ? path.join(root, 'dist/client/index.html')
        : path.join(root, 'index.html')
      let template = fs.readFileSync(templatePath, 'utf-8')
      /** @type {(url: string, origin: string) => Promise<{ html: string, head: string, state: unknown, status: number, lang: string }>} */
      let render
      if (!isProd && vite) {
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        render = (await import('./dist/server/entry-server.js')).render
      }
      const origin = `${req.protocol}://${req.get('host')}`
      const rendered = await render(url, origin)
      const html = template
        .replaceAll('__LANG__', rendered.lang)
        .replace('<!--head-->', rendered.head)
        .replace('<!--app-->', rendered.html)
        .replace('<!--state-->', `<script>window.__PINIA__=${serialize(rendered.state)}</script>`)
      res.status(rendered.status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html)
    } catch (error) {
      if (!isProd && vite && error instanceof Error) vite.ssrFixStacktrace(error)
      next(error)
    }
  })

  app.use((error, _req, res, _next) => {
    console.error(error)
    const body = isProd ? 'Internal Server Error' : error instanceof Error ? error.stack : String(error)
    res.status(500).type('text').end(body)
  })

  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}

start()
