import React, { useState, useRef } from 'react'
import { Button, SimpleFormField } from '@/components'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/common/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { changeAvatar, updateProfile } from '@/api/user'
import { BASE_URL } from '@/api/config'
import { formatPhone, cleanPhone } from '@/utils/phone'
import styles from './ProfileEdit.module.css'

export type NotificationType = {
  type: 'success' | 'error'
  message: string
}

export default function ProfileEdit() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    first_name: 'Андрей',
    second_name: 'Крутой',
    display_name: 'CloudChaser',
    login: 'CloudChaser',
    email: 'cloudchaser@example.com',
    phone: formatPhone('98765432109'),
  })
  const [avatar, setAvatar] = useState('/mock_avatar.svg')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

  const userInitials = formData.display_name.slice(0, 2).toUpperCase()
  const currentAvatar = previewImage || avatar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateProfile({
        ...formData,
        phone: cleanPhone(formData.phone),
      })
      setNotification({ type: 'success', message: 'Профиль успешно обновлен!' })
      setTimeout(() => navigate(ROUTES.PROTECTED.PROFILE), 1500)
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Ошибка при обновлении профиля',
      })
    }
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const formatted = formatPhone(value)
      setFormData(prev => ({
        ...prev,
        [name]: formatted,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setNotification({
          type: 'error',
          message: 'Выберите корректный файл изображения',
        })
        return
      }
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = event => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAvatar = async () => {
    if (!avatarFile) return
    setIsLoading(true)
    try {
      const user = await changeAvatar(avatarFile)
      setAvatar(`${BASE_URL}${user.avatar}`)
      setPreviewImage(null)
      setAvatarFile(null)
      setNotification({ type: 'success', message: 'Аватар обновлен!' })
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Ошибка при обновлении аватара',
      })
    }
    setIsLoading(false)
  }

  const handleDiscardChanges = () => {
    setPreviewImage(null)
    setAvatarFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCancel = () => {
    navigate(ROUTES.PROTECTED.PROFILE)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Редактирование профиля</h1>

          {notification && (
            <div
              className={`${styles.notification} ${styles[notification.type]}`}>
              {notification.message}
            </div>
          )}

          <div className={styles.avatarSection}>
            <Avatar
              size={160}
              borderWidth={4}
              borderColor="var(--bird-yellow)"
              shadow={true}>
              <AvatarImage src={currentAvatar} alt={formData.display_name} />
              <AvatarFallback fontSize={32}>{userInitials}</AvatarFallback>
            </Avatar>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />

            {previewImage ? (
              <div className={styles.avatarActions}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDiscardChanges}
                  disabled={isLoading}>
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveAvatar}
                  disabled={isLoading}>
                  {isLoading ? 'Сохранение...' : 'Применить'}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}>
                Изменить фото
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <SimpleFormField
              label="Имя"
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Фамилия"
              type="text"
              name="second_name"
              id="second_name"
              value={formData.second_name}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Отображаемое имя"
              type="text"
              name="display_name"
              id="display_name"
              value={formData.display_name}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Логин"
              type="text"
              name="login"
              id="login"
              value={formData.login}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Email"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />

            <SimpleFormField
              label="Телефон"
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
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
