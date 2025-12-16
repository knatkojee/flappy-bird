import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components'
import { ROUTES } from '@/constants/routes'
import styles from './Header.module.css'

export default function Header() {
  const location = useLocation()
  const isAuthenticated = true // TODO

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: ROUTES.PUBLIC.HOME, label: 'Главная' },
    { path: ROUTES.PROTECTED.LEADERBOARD, label: 'Лидерборд' },
  ]

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
              <Button
                variant="outline"
                onClick={() => {
                  // TODO: Handle logout
                }}>
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
