import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleTheme as toggleThemeAction,
  fetchUserTheme,
  updateUserTheme,
} from '@/store/themeSlice'
import type { RootState, AppDispatch } from '@/store'

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector((state: RootState) => state.theme.theme)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserTheme(user.id))
    }
  }, [user?.id, dispatch])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(toggleThemeAction())

    if (user?.id) {
      dispatch(updateUserTheme({ userId: user.id, theme: newTheme }))
    }
  }

  return { theme, toggleTheme }
}
