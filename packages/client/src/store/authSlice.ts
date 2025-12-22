import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from '@/types/auth'
import { getUser, logout as logoutUser } from '@/api/auth'

type AuthState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  return await getUser()
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export default authSlice.reducer
