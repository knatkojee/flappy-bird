import { useState } from 'react'
import classNames from 'classnames'
import { Button, SimpleFormField } from '@/components'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { changePassword } from '@/api/user'
import styles from './PasswordEdit.module.css'
import { useForm } from '@/hooks/useForm'
import { passwordValidator } from '@/lib/validators'

type NotificationType = {
  type: 'success' | 'error'
  message: string
}

type PasswordEditForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function PasswordEdit() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<PasswordEditForm>(
      {},
      {
        currentPassword: passwordValidator,
        newPassword: passwordValidator,
        confirmPassword: passwordValidator,
      }
    )

  const onSubmit = async (data: PasswordEditForm) => {
    if (data.newPassword !== data.confirmPassword) {
      setNotification({ type: 'error', message: 'Пароли не совпадают' })
      return
    }

    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      setNotification({ type: 'success', message: 'Пароль успешно изменен!' })
      setTimeout(() => navigate(ROUTES.PROTECTED.PROFILE), 1500)
    } catch (error) {
      setNotification({ type: 'error', message: 'Ошибка при изменении пароля' })
    }
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

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <SimpleFormField
              label="Текущий пароль"
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
            />

            <SimpleFormField
              label="Новый пароль"
              type="password"
              name="newPassword"
              id="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
            />

            <SimpleFormField
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <div className={styles.buttonGroup}>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}>
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
