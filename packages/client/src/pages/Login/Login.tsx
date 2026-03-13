import { Button } from '@/components'
import { Input } from '@/components/common/Input/Input'
import { Label } from '@/components/common/Label/Label'
import { User, Lock } from '@/components/common/Icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Login.module.css'
import { signin, getYandexServiceId, fetchUser } from '@shared'
import type { SignInData } from '@/types/auth'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useForm } from '@/hooks/useForm'
import { loginValidator, passwordValidator } from '@/lib/validators'

const REDIRECT_URI = window.location.origin

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<SignInData>(
      {},
      {
        login: loginValidator,
        password: passwordValidator,
      }
    )

  const onSubmit = async (data: SignInData) => {
    const signInData: SignInData = {
      login: data.login,
      password: data.password,
    }

    try {
      await signin(signInData)
      await dispatch(fetchUser())
      toast.success('Вы успешно вошли!')
      navigate(ROUTES.PUBLIC.HOME)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const handleYandexLogin = async () => {
    try {
      const { service_id } = await getYandexServiceId(REDIRECT_URI)
      const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
      window.open(yandexAuthUrl, '_blank')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                value={values.login}
                onChange={handleChange}
                error={errors.login}
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
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg">
            {isSubmitting ? '...' : 'Войти'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleYandexLogin}
            className={styles.yandexButton}>
            Войти через Яндекс
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
