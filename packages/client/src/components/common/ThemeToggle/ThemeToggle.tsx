import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '../../../hooks/useTheme'
import { updateUserTheme } from '@/store/themeSlice'
import type { RootState, AppDispatch } from '@/store'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    toggleTheme()

    if (user?.id) {
      dispatch(updateUserTheme({ userId: user.id, theme: newTheme }))
    }
  }

  return (
    <div
      onClick={handleToggle}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? '🌚' : '🌞'}
    </div>
  )
}
