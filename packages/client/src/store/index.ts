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

export const createAppStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  })
}

export const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
