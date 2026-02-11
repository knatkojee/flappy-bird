import type { User } from '@/types/auth'
declare type AuthState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
export declare const fetchUser: import('@reduxjs/toolkit').AsyncThunk<
  any,
  void,
  {
    state?: unknown
    dispatch?: import('redux').Dispatch<import('redux').AnyAction>
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
  }
>
export declare const logout: import('@reduxjs/toolkit').AsyncThunk<
  void,
  void,
  {
    state?: unknown
    dispatch?: import('redux').Dispatch<import('redux').AnyAction>
    extra?: unknown
    rejectValue?: unknown
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
  }
>
export declare const updateUser: import('@reduxjs/toolkit').ActionCreatorWithPayload<
  any,
  'auth/updateUser'
>
declare const _default: import('redux').Reducer<
  import('immer/dist/internal').WritableDraft<AuthState>,
  import('redux').AnyAction
>
export default _default
