import React, { useState } from 'react'
import { Button, SimpleFormField } from '@/components'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './ProfileEdit.module.css'

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    username: 'CloudChaser',
    email: 'cloudchaser@example.com',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
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
          <h1 className={styles.title}>Редактирование профиля</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <SimpleFormField
              label="Имя пользователя"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
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
