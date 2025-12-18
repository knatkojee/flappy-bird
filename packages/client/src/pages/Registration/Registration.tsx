import { Button } from '@/components'
import { FormField } from '@/components/common/FormField/FormField'
import { User, Mail, Lock } from '@/components/common/Icon/Icon'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Registration.module.css'
import { signup } from '@/api/auth'
import { SignUpData } from '@/types/auth'
import { toast } from 'react-toastify'

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const {
      first_name,
      second_name,
      login,
      email,
      password,
      passwordConfirm,
      phone,
    } = Object.fromEntries(formData.entries())

    if (password !== passwordConfirm) {
      toast.error('Пароли не совпадают')
      return
    }

    const signUpData: SignUpData = {
      first_name: String(first_name),
      second_name: String(second_name),
      login: String(login),
      email: String(email),
      password: String(password),
      phone: String(phone),
    }

    setIsLoading(true)
    try {
      await signup(signUpData)
      toast.success('Вы успешно зарегистрировались!')
      navigate(ROUTES.PUBLIC.HOME)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.birdIcon}>🐦</div>
            <h1 className={styles.title}>Присоединяйся к стае!</h1>
            <p className={styles.subtitle}>
              Создай аккаунт и начни свое приключение
            </p>
          </div>

          <form action="#" onSubmit={handleSubmit} className={styles.form}>
            <FormField
              id="first_name"
              name="first_name"
              type="text"
              label="Имя"
              placeholder="Имя"
              icon={User}
              required
            />

            <FormField
              id="second_name"
              name="second_name"
              type="text"
              label="Фамилия"
              placeholder="Фамилия"
              icon={User}
              required
            />

            <FormField
              id="login"
              name="login"
              type="text"
              label="Имя пользователя"
              placeholder="username"
              icon={User}
              required
            />

            <FormField
              id="phone"
              name="phone"
              type="tel"
              label="Телефон"
              placeholder="Телефон"
              icon={User}
              required
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Электронная почта"
              placeholder="email@example.com"
              icon={Mail}
              required
            />

            <FormField
              id="password"
              name="password"
              type="password"
              label="Пароль"
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <FormField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Подтвердите пароль"
              placeholder="••••••••"
              icon={Lock}
              required
            />

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                required
              />
              <span className={styles.checkboxText}>
                Я соглашаюсь с{' '}
                <Link to="#" className={styles.link}>
                  Условиями обслуживания
                </Link>{' '}
                и{' '}
                <Link to="#" className={styles.link}>
                  Политикой конфиденциальности
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="lg">
              {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
            </Button>
          </form>

          <p className={styles.signInText}>
            Уже есть аккаунт?{' '}
            <Link to={ROUTES.PUBLIC.LOGIN} className={styles.link}>
              Войдите здесь
            </Link>
          </p>
        </div>

        <div className={styles.additionalInfo}>
          <p className={styles.additionalInfoText}>
            Присоединяйтесь к тысячам игроков в непревзойденном летном вызове.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
