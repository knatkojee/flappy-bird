import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { ROUTES } from '@/constants/routes'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout } from '@shared'

export default function Footer() {
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerBrand}>
              <span className={styles.footerBrandIcon}>🐦</span> Flappy Bird
            </h3>
            <p className={styles.footerDescription}>
              Освойте классическую игру с друзьями. Соревнуйтесь, учитесь и
              достигайте новых высот.
            </p>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>Игра</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to={ROUTES.PROTECTED.GAME} className={styles.footerLink}>
                  Играть сейчас
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PROTECTED.LEADERBOARD}
                  className={styles.footerLink}>
                  Лидерборд
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>Аккаунт</h4>
            <ul className={styles.footerLinks}>
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link
                      to={ROUTES.PUBLIC.LOGIN}
                      className={styles.footerLink}>
                      Вход
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={ROUTES.PUBLIC.REGISTRATION}
                      className={styles.footerLink}>
                      Регистрация
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to={ROUTES.PROTECTED.PROFILE}
                      className={styles.footerLink}>
                      Профиль
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={styles.footerLink}
                      onClick={handleLogout}>
                      Выход
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
