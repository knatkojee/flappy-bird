import { Button } from '@/components'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { User, Lock } from '@/components/common/Icon/Icon'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Login.module.css'
import { signin } from '@/api/auth'
import { SignInData } from '@/types/auth'
import { toast } from 'react-toastify'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    setIsLoading(true)
    try {
      await signin(data as unknown as SignInData)
      toast.success('Вы успешно вошли!')
      navigate(ROUTES.PROTECTED.PROFILE)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.birdIcon}>🐦</div>
          <h1 className={styles.title}>С возвращением!</h1>
          <p className={styles.subtitle}>
            Войдите в свой аккаунт и начните летать!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <Label htmlFor="login" className={styles.fieldLabel}>
              Логин
            </Label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <Input
                id="login"
                name="login"
                type="text"
                placeholder="flyingbird123"
                size="sm"
                withIcon
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <Label htmlFor="password" className={styles.fieldLabel}>
              Пароль
            </Label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                size="sm"
                withIcon
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            size="lg">
            {isLoading ? '...' : 'Войти'}
          </Button>
        </form>

        <p className={styles.signInText}>
          Нет аккаунта?{' '}
          <Link to={ROUTES.PUBLIC.REGISTRATION} className={styles.link}>
            Зарегистрируйся
          </Link>
        </p>
      </div>
    </article>
  )
}

export default Login
