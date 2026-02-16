import { Button } from '@/components'
import { FormField } from '@/components/common/FormField/FormField'
import { User, Mail, Lock } from '@/components/common/Icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import styles from './Registration.module.css'
import { signup } from '@shared'
import type { SignUpData } from '@/types/auth'
import { toast } from 'react-toastify'
import { useForm } from '@/hooks/useForm'
import {
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '@/lib/validators'

type RegistrationForm = SignUpData & {
  passwordConfirm: string
}

const Registration = () => {
  const navigate = useNavigate()

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useForm<RegistrationForm>(
      {},
      {
        first_name: nameValidator,
        second_name: nameValidator,
        login: loginValidator,
        email: emailValidator,
        password: passwordValidator,
        phone: phoneValidator,
        passwordConfirm: passwordValidator,
      }
    )

  const onSubmit = async (data: RegistrationForm) => {
    if (data.password !== data.passwordConfirm) {
      toast.error('Пароли не совпадают')
      return
    }

    const signUpData: SignUpData = {
      first_name: data.first_name,
      second_name: data.second_name,
      login: data.login,
      email: data.email,
      password: data.password,
      phone: data.phone,
    }

    try {
      await signup(signUpData)
      toast.success('Вы успешно зарегистрировались!')
      navigate(ROUTES.PUBLIC.HOME)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
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

          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}>
            <FormField
              id="first_name"
              name="first_name"
              type="text"
              label="Имя"
              placeholder="Имя"
              icon={User}
              value={values.first_name}
              onChange={handleChange}
              error={errors.first_name}
            />

            <FormField
              id="second_name"
              name="second_name"
              type="text"
              label="Фамилия"
              placeholder="Фамилия"
              icon={User}
              value={values.second_name}
              onChange={handleChange}
              error={errors.second_name}
            />

            <FormField
              id="login"
              name="login"
              type="text"
              label="Имя пользователя"
              placeholder="username"
              icon={User}
              value={values.login}
              onChange={handleChange}
              error={errors.login}
            />

            <FormField
              id="phone"
              name="phone"
              type="tel"
              label="Телефон"
              placeholder="Телефон"
              icon={User}
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <FormField
              id="email"
              name="email"
              type="email"
              label="Электронная почта"
              placeholder="email@example.com"
              icon={Mail}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              id="password"
              name="password"
              type="password"
              label="Пароль"
              placeholder="••••••••"
              icon={Lock}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <FormField
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Подтвердите пароль"
              placeholder="••••••••"
              icon={Lock}
              value={values.passwordConfirm}
              onChange={handleChange}
              error={errors.passwordConfirm}
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
              disabled={isSubmitting}
              variant="primary"
              size="lg">
              {isSubmitting ? 'Создание аккаунта...' : 'Создать аккаунт'}
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
