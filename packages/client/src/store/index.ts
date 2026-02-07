import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../../../shared/store/authSlice'

const deserializeState = (preloadedState: any): any => {
  if (!preloadedState || typeof preloadedState !== 'object') {
    return undefined
  }

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
