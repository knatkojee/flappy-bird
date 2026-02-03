import type { Request } from 'express'
import type { Store } from 'redux'
import { store } from '../store/store'
import { fetchUser } from '../store/authSlice'

/**
 * Создает Redux store для серверного рендеринга с предзагрузкой данных
 * @param req Express request объект
 * @returns Promise с инициализированным store и предзагруженными данными
 */
export const initializeServerStore = async (
  req: Request
): Promise<{
  store: Store
  initialState: any
}> => {
  // TODO: создать настоящий store
  const serverStore = store

  try {
    const hasAuthCookie = req.headers.cookie?.includes('authCookie')

    if (hasAuthCookie) {
      await serverStore.dispatch(fetchUser() as any)

      console.log('Данные пользователя загружены')
    } else {
      console.log('Пользователь не авторизован')
    }
  } catch (error) {
    console.warn('Ошибка при предзагрузке данных:', error)
  }

  const initialState = serverStore.getState()

  console.log('Серверный store инициализирован')
  console.log('Состояние:', JSON.stringify(initialState, null, 2))

  return {
    store: serverStore,
    initialState,
  }
}

/**
 * Форматирует состояние для передачи в HTML
 * @param state Состояние Redux store
 * @returns Строка с JSON для встраивания в HTML
 */
export const serializeStateForClient = (state: any): string => {
  const cleanState = JSON.parse(JSON.stringify(state))

  return JSON.stringify(cleanState)
}
