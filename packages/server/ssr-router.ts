import type { Request, Response } from 'express'
import { serializeStateForClient } from '../../shared/server/renderer'

// TODO: добавить реальные типы
type AuthState = {
  user: any | null
  isLoading: boolean
  isAuthenticated: boolean
}

// TODO: Тестовая инициализации store
const initializeServerStore = async (
  req: Request
): Promise<{
  store: { getState: () => { auth: AuthState } }
  initialState: { auth: AuthState }
}> => {
  const hasAuthCookie = req.headers.cookie?.includes('authCookie')

  const mockState: AuthState = hasAuthCookie
    ? {
        user: {
          id: 1,
          first_name: 'Иван',
          second_name: 'Иванов',
          display_name: null,
          login: 'ivanov',
          email: 'ivan@example.com',
          phone: '+79001234567',
          avatar: null,
        },
        isLoading: false,
        isAuthenticated: true,
      }
    : {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      }

  const mockStore = {
    getState: () => ({ auth: mockState }),
  }

  console.log('Серверный store инициализирован')
  console.log('Состояние:', JSON.stringify(mockState, null, 2))

  return {
    store: mockStore,
    initialState: { auth: mockState },
  }
}

// TODO: тестовая генерация HTML
const generateHTML = (
  content: string,
  serializedState: string,
  title: string = 'Flappy Bird Game'
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
    
    <!-- Встроенное состояние Redux для гидратации на клиенте -->
    <script>
      window.__INITIAL_STATE__ = ${serializedState};
    </script>
    
    <!-- Здесь будут подключены статические файлы -->
    <!-- В production они будут добавлены Vite -->
</body>
</html>`
}

/**
 * Серверный роутер для SSR
 */
export const ssrHandler = async (req: Request, res: Response) => {
  try {
    const { store, initialState } = await initializeServerStore(req)

    const reactContent = `
      <div id="app">
        <h1>Flappy Bird - Server Side Rendered</h1>
        <div id="user-info">
          ${
            store.getState().auth.user
              ? `<p>Добро пожаловать, ${
                  store.getState().auth.user.first_name
                }!</p>`
              : '<p>Вы не авторизованы</p>'
          }
        </div>
        <div id="redux-state">
          <h3>Redux State (Server):</h3>
          <pre>${JSON.stringify(initialState, null, 2)}</pre>
        </div>
      </div>
    `

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
        <p>Попробуйте обновить страницу.</p>
      </div>`,
      fallbackState,
      'Flappy Bird - Error'
    )

    res.status(500).send(fallbackHTML)
  }
}

/**
 * Обычный API роутер
 */
export const apiHandler = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Flappy Bird API Server',
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
  })
}
