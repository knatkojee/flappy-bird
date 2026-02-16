/* eslint-disable @typescript-eslint/no-var-requires */

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import path from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer } from 'vite'

const port = process.env.PORT || 3002
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
      ssr: {
        noExternal: [],
        external: ['react', 'react-dom', 'express', 'dotenv'],
      },
    })
    app.use(vite.middlewares)

    app.get('*', async (req, res) => {
      try {
        const template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        const transformed = await vite.transformIndexHtml(req.url, template)
        const { render } = await vite.ssrLoadModule(
          path.join(clientPath, 'src/entry-server.tsx')
        )
        const appHtml = await render(req.url)
        const html = transformed.replace('<!--ssr-outlet-->', appHtml)
        res.send(html)
      } catch (e) {
        console.error(e)
        res.status(500).send('Internal Server Error')
      }
    })
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )

    const template = await fs.readFile(
      path.join(clientPath, 'dist/client/index.html'),
      'utf-8'
    )
    const { render } = require(path.join(
      clientPath,
      'dist/server/entry-server.js'
    ))

    app.get('*', async (req, res) => {
      try {
        const appHtml = await render(req.url)
        const html = template.replace('<!--ssr-outlet-->', appHtml)
        res.send(html)
      } catch (e) {
        console.error(e)
        res.status(500).send('Internal Server Error')
      }
    })
  }

  app.listen(port, () => {
    console.log(
      `✅ SSR server on port ${port}, mode: ${isDev ? 'dev' : 'prod'}`
    )
  })
}

createServer()
