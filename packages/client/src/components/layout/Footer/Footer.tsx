import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { ROUTES } from '@/constants/routes'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div>
            <h3 className={styles.footerBrand}>
              <span className={styles.footerBrandIcon}>🐦</span> Flappy Bird
            </h3>
            <p className={styles.footerDescription}>
              Master the classic game with friends. Compete, learn, and achieve
              new heights.
            </p>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>Game</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to={ROUTES.PROTECTED.GAME} className={styles.footerLink}>
                  Play Now
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PROTECTED.LEADERBOARD}
                  className={styles.footerLink}>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className={styles.footerSectionTitle}>Account</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link to={ROUTES.PUBLIC.LOGIN} className={styles.footerLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PUBLIC.REGISTRATION}
                  className={styles.footerLink}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
