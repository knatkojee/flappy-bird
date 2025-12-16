import React, { useState } from 'react'
import { Button, SimpleFormField } from '@/components'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './PasswordEdit.module.css'

export default function PasswordEdit() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Пароли не совпадают')
      return
    }
    console.log('Password updated')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Изменение пароля</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <SimpleFormField
              label="Текущий пароль"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Новый пароль"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className={styles.buttonGroup}>
              <Link to={ROUTES.PROTECTED.PROFILE}>
                <Button variant="outline" style={{ width: '100%' }}>
                  Отмена
                </Button>
              </Link>
              <Button type="submit" variant="primary">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
