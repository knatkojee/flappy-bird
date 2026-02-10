import type { Request } from 'express'
import type { Store } from 'redux'
import type { AuthState } from '../store/authSlice'
import { fetchUser } from '../store/authSlice'

type RootState = {
  auth: AuthState
}

/**
 * Проверяет, можно ли сериализовать значение
 * @param value Значение для проверки
 * @returns true если значение можно сериализовать
 */
const isSerializable = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true
  }

  const type = typeof value

  if (type === 'string' || type === 'number' || type === 'boolean') {
    return true
  }

  if (Array.isArray(value)) {
    return value.every(isSerializable)
  }

  if (type === 'object') {
    if (
      value instanceof Function ||
      value instanceof Symbol ||
      value instanceof BigInt ||
      value instanceof Date ||
      // (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement)) {
      (typeof window !== 'undefined' &&
        value instanceof (window as any).HTMLElement)
    ) {
      return false
    }

    return Object.keys(value).every(key => isSerializable(value[key]))
  }

  return false
}

/**
 * Очищает состояние от несериализуемых данных
 * @param state Состояние для очистки
 * @returns Очищенное состояние
 */
const cleanStateForSerialization = (state: any): any => {
  if (state === null || state === undefined) {
    return state
  }

  const type = typeof state

  if (type === 'string' || type === 'number' || type === 'boolean') {
    return state
  }

  if (Array.isArray(state)) {
    return state.map(cleanStateForSerialization)
  }

  if (type === 'object') {
    if (state instanceof Date) {
      return state.toISOString()
    }

    const cleaned: any = {}

    for (const [key, value] of Object.entries(state)) {
      if (isSerializable(value)) {
        cleaned[key] = cleanStateForSerialization(value)
      } else {
        cleaned[key] = null
      }
    }

    return cleaned
  }

  return null
}

/**
 * Проверяет, что состояние валидно для сериализации
 * @param state Состояние для проверки
 * @returns true если состояние валидно
 */
const validateSerializedState = (state: any): boolean => {
  if (state === null || state === undefined) {
    return false
  }

  if (typeof state !== 'object') {
    return false
  }

  if (state.auth) {
    const { auth } = state
    if (typeof auth !== 'object') {
      return false
    }
  }

  return true
}

/**
 * Создает Redux store для серверного рендеринга с предзагрузкой данных
 * @param req Express request объект
 * @returns Promise с инициализированным store и предзагруженными данными
 */
export const initializeServerStore = async (
  req: Request
): Promise<{
  store: Store<RootState>
  initialState: RootState
}> => {
  // Создаем новый store для каждого запроса
  const { configureStore } = await import('@reduxjs/toolkit')
  const authReducer = (await import('../store/authSlice')).default

  const serverStore = configureStore({
    reducer: {
      auth: authReducer,
    },
  })

  try {
    const hasAuthCookie = req.headers.cookie?.includes('authCookie')

    if (hasAuthCookie) {
      await serverStore.dispatch(fetchUser() as any)
    }
  } catch (error) {
    console.error('Ошибка при предзагрузке данных:', error)
  }

  const initialState = serverStore.getState()

  if (!initialState || typeof initialState !== 'object') {
    console.error('Некорректное состояние store:', initialState)
    throw new Error('Некорректное состояние Redux store')
  }

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
export const serializeStateForClient = (state: RootState): string => {
  try {
    if (!validateSerializedState(state)) {
      return JSON.stringify({
        auth: { user: null, isLoading: false, isAuthenticated: false },
      })
    }

    const cleanState = cleanStateForSerialization(state)

    if (!validateSerializedState(cleanState)) {
      return JSON.stringify({
        auth: { user: null, isLoading: false, isAuthenticated: false },
      })
    }

    return JSON.stringify(cleanState)
  } catch (error) {
    console.error('Ошибка при сериализации состояния:', error)

    const fallbackState = {
      auth: {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      },
    }

    return JSON.stringify(fallbackState)
  }
}
