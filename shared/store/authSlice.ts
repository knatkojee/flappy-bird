import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from '../types'
import { getUser, logout as logoutUser } from '../api/auth'

export type AuthState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const USER_STORAGE_KEY = 'flappy_bird_user'

const getSavedUser = (): User | null => {
  if (typeof window === 'undefined') {
    // Серверное окружение
    return null
  }

  try {
    const saved = localStorage.getItem(USER_STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

// На сервере ничего не делает
const saveUser = (user: User | null) => {
  if (typeof window === 'undefined') {
    // Серверное окружение
    return
  }

  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  return await getUser()
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser()
})

const initialState: AuthState = {
  user: getSavedUser(),
  isLoading: !getSavedUser(),
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      saveUser(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        if (!state.user) {
          state.isLoading = true
        }
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
        saveUser(action.payload)
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
        const savedUser = getSavedUser()
        if (savedUser) {
          state.isAuthenticated = true
          state.user = savedUser
        } else {
          state.isAuthenticated = false
          state.user = null
        }
      })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false
        state.user = null
        saveUser(null)
      })
  },
})

export const { updateUser } = authSlice.actions
export default authSlice.reducer
