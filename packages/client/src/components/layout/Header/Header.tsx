import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components'
import { ROUTES } from '@/constants/routes'
import styles from './Header.module.css'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout } from '@shared'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: ROUTES.PUBLIC.HOME, label: 'Главная' },
    { path: ROUTES.PROTECTED.LEADERBOARD, label: 'Лидерборд' },
    { path: ROUTES.PROTECTED.FORUM, label: 'Форум' },
  ]

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      toast.success('Вы успешно вышли!')
      navigate(ROUTES.PUBLIC.LOGIN)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to={ROUTES.PUBLIC.HOME} className={styles.logoLink}>
          <div className={styles.logoIcon}>🐦</div>
          <span className={styles.logoText}>Flappy Bird</span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={styles.navLink}>
              <Button variant={isActive(link.path) ? 'default' : 'ghost'}>
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className={styles.authButtons}>
          {!isAuthenticated ? (
            <>
              <Link to={ROUTES.PUBLIC.LOGIN}>
                <Button variant="outline">Вход</Button>
              </Link>
              <Link to={ROUTES.PUBLIC.REGISTRATION}>
                <Button variant="primary">Регистрация</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={ROUTES.PROTECTED.PROFILE}>
                <Button variant="outline">Профиль</Button>
              </Link>
              <Button variant="secondary" onClick={handleLogout}>
                Выход
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={styles.mobileNav}>
        {navLinks.map(link => (
          <Link key={link.path} to={link.path} className={styles.navLink}>
            <Button
              variant={isActive(link.path) ? 'default' : 'ghost'}
              size="sm">
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </header>
  )
}
