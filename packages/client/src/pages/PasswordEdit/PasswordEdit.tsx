import React, { useState } from 'react'
import { Button, SimpleFormField } from '@/components'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { changePassword } from '@/api/user'
import styles from './PasswordEdit.module.css'

export default function PasswordEdit() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setNotification({ type: 'error', message: 'Заполните все поля' })
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({ type: 'error', message: 'Пароли не совпадают' })
      return
    }

    if (formData.newPassword.length < 6) {
      setNotification({
        type: 'error',
        message: 'Пароль должен содержать минимум 6 символов',
      })
      return
    }

    setIsLoading(true)
    try {
      await changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      setNotification({ type: 'success', message: 'Пароль успешно изменен!' })
      setTimeout(() => navigate(ROUTES.PROTECTED.PROFILE), 1500)
    } catch (error) {
      setNotification({ type: 'error', message: 'Ошибка при изменении пароля' })
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCancel = () => {
    navigate(ROUTES.PROTECTED.PROFILE)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Изменение пароля</h1>

          {notification && (
            <div
              className={`${styles.notification} ${styles[notification.type]}`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <SimpleFormField
              label="Текущий пароль"
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Новый пароль"
              type="password"
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className={styles.buttonGroup}>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}>
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
