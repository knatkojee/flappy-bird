import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getThemeProfile, updateThemeProfile } from '@/api/user'
import type { RootState } from './index'
import type { Theme } from '@/types/user'

type ThemeState = {
  theme: Theme
  isLoading: boolean
  error: string | null
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = localStorage.getItem('theme') as Theme
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
  isLoading: false,
  error: null,
}

export const fetchUserTheme = createAsyncThunk<
  { theme: Theme },
  number,
  { state: RootState }
>('theme/fetchUserTheme', async userId => {
  const response = await getThemeProfile(userId)
  return { theme: response.theme }
})

export const updateUserTheme = createAsyncThunk<
  { theme: Theme },
  { userId: number; theme: Theme },
  { state: RootState }
>('theme/updateUserTheme', async ({ userId, theme }) => {
  const response = await updateThemeProfile({ userId, theme })

  if ('theme' in response) {
    return { theme: response.theme as Theme }
  }

  return { theme }
})

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserTheme.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserTheme.fulfilled, (state, action) => {
        state.isLoading = false
        state.theme = action.payload.theme
        localStorage.setItem('theme', action.payload.theme)
      })
      .addCase(fetchUserTheme.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch theme'
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        state.theme = action.payload.theme
        localStorage.setItem('theme', action.payload.theme)
      })
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
