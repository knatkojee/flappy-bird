import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../../../shared/store/authSlice'
import { LeaderBoardApi } from './leaderboardApi'

const deserializeState = (preloadedState: any): any => {
  if (!preloadedState || typeof preloadedState !== 'object') {
    return undefined
  }

  return preloadedState
}

export const createAppStore = (preloadedState?: any) => {
  const deserializedState = deserializeState(preloadedState)

  const store = configureStore({
    reducer: {
      auth: authReducer,
      [LeaderBoardApi.reducerPath]: LeaderBoardApi.reducer,
    },
    preloadedState: deserializedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(LeaderBoardApi.middleware),
  })

  return store
}

export const store = createAppStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
