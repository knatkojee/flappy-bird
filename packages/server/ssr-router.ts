import type { Request, Response } from 'express'
import {
  serializeStateForClient,
  renderApp,
  initializeServerStore,
} from '../../shared/server'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - AppWrapper import works at runtime
import AppWrapper from './client-import.js'

const generateHTML = (
  content: string,
  serializedState: string,
  title = 'Flappy Bird Game'
): string => {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="Игра Flappy Bird с SSR и Redux">
</head>
<body>
    <div id="root">${content}</div>
    
    <script>
      window.__INITIAL_STATE__ = ${serializedState};
    </script>
</body>
</html>`
}

export const ssrHandler = async (req: Request, res: Response) => {
  try {
    const { store, initialState } = await initializeServerStore(req)

    const reactContent = renderApp(req.url, store, AppWrapper)
    const serializedState = serializeStateForClient(initialState)

    if (!serializedState || serializedState === 'null') {
      throw new Error('Не удалось сериализовать состояние')
    }

    const html = generateHTML(
      reactContent,
      serializedState,
      'Flappy Bird - SSR'
    )

    res.status(200).send(html)
  } catch (error) {
    console.error('Ошибка SSR:', error)

    const fallbackState = JSON.stringify({
      auth: { user: null, isLoading: false, isAuthenticated: false },
    })

    const fallbackHTML = generateHTML(
      `<div id="app">
        <h1>Flappy Bird - Server Error</h1>
        <p>Произошла ошибка при серверном рендеринге.</p>
      </div>`,
      fallbackState,
      'Flappy Bird - Error'
    )

    res.status(500).send(fallbackHTML)
  }
}

export const apiHandler = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Flappy Bird API Server',
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
  })
}
