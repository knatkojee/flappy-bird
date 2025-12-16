import { Button } from '@/components'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { User, Lock } from '@/components/common/Icon/Icon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Login.module.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement registration logic
    setTimeout(() => setIsLoading(false), 1000)
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
            <Label htmlFor="username" className={styles.fieldLabel}>
              Логин
            </Label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} />
              <Input
                id="username"
                type="text"
                placeholder="flyingbird123"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
