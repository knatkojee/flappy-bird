import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import Button from '@/components/common/Button/Button'
import { ROUTES } from '@/constants/routes'

export default function Header() {
  const location = useLocation()
  const isAuthenticated = false // TODO: Replace with actual auth state

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: ROUTES.PUBLIC.HOME, label: 'Home' },
    { path: ROUTES.PROTECTED.LEADERBOARD, label: 'Leaderboard' },
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
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={ROUTES.PUBLIC.REGISTRATION}>
                <Button variant="primary">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={ROUTES.PROTECTED.PROFILE}>
                <Button variant="outline">Profile</Button>
              </Link>
              <Button
                variant="secondary"
                onClick={() => {
                  // TODO: Handle logout
                }}>
                Logout
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
