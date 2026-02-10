import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

type RootState = {
  auth: {
    user: any // TODO добавить тип
    isLoading: boolean
    isAuthenticated: boolean
  }
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
