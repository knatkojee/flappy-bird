import { configureStore } from '@reduxjs/toolkit'

// TODO: Временный локальный reducer для теста
const authReducer = (
  state: any = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  },
  action: any
) => {
  switch (action.type) {
    case 'auth/fetchUser/fulfilled':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      }
    default:
      return state
  }
}

/**
 * Десериализует состояние, полученное с сервера
 * @param preloadedState Состояние с сервера
 * @returns Очищенное состояние для Redux
 */
const deserializeState = (preloadedState: any): any => {
  if (!preloadedState || typeof preloadedState !== 'object') {
    console.log('Некорректное предзагруженное состояние:', preloadedState)
    return undefined
  }

  console.log('Исходное состояние:', preloadedState)

  if (preloadedState.auth) {
    const { auth } = preloadedState
    console.log('Auth state после десериализации:', {
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      hasUser: !!auth.user,
    })
  }

  return preloadedState
}

/**
 * Создает Redux store для клиента с предзагруженным состоянием
 * @param preloadedState Состояние, полученное с сервера
 * @returns Настроенный Redux store
 */
export const createAppStore = (preloadedState?: any) => {
  const deserializedState = deserializeState(preloadedState)

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: deserializedState,
  })

  console.log('Redux store создан')
  console.log('Начальное состояние store:', store.getState())

  return store
}

export const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
