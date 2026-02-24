import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setTheme as setThemeAction,
  toggleTheme as toggleThemeAction,
  fetchUserTheme,
  updateUserTheme,
  selectTheme,
  selectThemeLoading,
} from '@/store/themeSlice'
import type { RootState, AppDispatch } from '@/store'
import type { Theme } from '@/types/user'

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector(selectTheme)
  const isLoading = useSelector(selectThemeLoading)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserTheme())
    }
  }, [user?.id, dispatch])

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(toggleThemeAction())

    if (user?.id) {
      await dispatch(updateUserTheme(newTheme))
    }
  }, [dispatch, user?.id, theme])

  const setTheme = useCallback(
    async (newTheme: Theme) => {
      dispatch(setThemeAction(newTheme))

      if (user?.id) {
        await dispatch(updateUserTheme(newTheme))
      }
    },
    [dispatch, user?.id]
  )

  return {
    theme,
    toggleTheme,
    setTheme,
    isLoading,
  }
}
