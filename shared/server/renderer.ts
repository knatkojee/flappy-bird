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
        console.warn(`Фильтруем несериализуемое свойство "${key}":`, value)
        cleaned[key] = null
      }
    }

    return cleaned
  }

  console.warn(`Фильтруем несериализуемое значение:`, state)
  return null
}

/**
 * Проверяет, что состояние валидно для сериализации
 * @param state Состояние для проверки
 * @returns true если состояние валидно
 */
const validateSerializedState = (state: any): boolean => {
  if (state === null || state === undefined) {
    console.warn('Состояние пустое')
    return false
  }

  if (typeof state !== 'object') {
    console.warn('Состояние не является объектом:', typeof state)
    return false
  }

  if (state.auth) {
    const { auth } = state
    if (typeof auth !== 'object') {
      console.warn('auth не является объектом:', typeof auth)
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
      console.log('Данные пользователя загружены')
    } else {
      console.log('Пользователь не авторизован')
    }
  } catch (error) {
    console.warn('Ошибка при предзагрузке данных:', error)
  }

  const initialState = serverStore.getState()

  if (!initialState || typeof initialState !== 'object') {
    console.error('Некорректное состояние store:', initialState)
    throw new Error('Некорректное состояние Redux store')
  }

  console.log('Серверный store инициализирован')
  console.log('Структура состояния:', Object.keys(initialState))

  if (initialState.auth) {
    console.log('👤 Auth state:', {
      isAuthenticated: initialState.auth.isAuthenticated,
      isLoading: initialState.auth.isLoading,
      hasUser: !!initialState.auth.user,
      userId: initialState.auth.user?.id,
      userLogin: initialState.auth.user?.login,
    })
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
      console.warn('Состояние невалидно')
      return JSON.stringify({
        auth: { user: null, isLoading: false, isAuthenticated: false },
      })
    }

    const cleanState = cleanStateForSerialization(state)

    if (!validateSerializedState(cleanState)) {
      console.warn('Очищенное состояние невалидно')
      return JSON.stringify({
        auth: { user: null, isLoading: false, isAuthenticated: false },
      })
    }

    const serializedState = JSON.stringify(cleanState)

    console.log('Состояние успешно сериализовано')
    console.log(
      'Размер сериализованного состояния:',
      serializedState.length,
      'символов'
    )

    return serializedState
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
