import classNames from 'classnames'
import styles from '../GameStartScreen.module.css'

type CountLoaderProps = {
  countdown: number
}

export const CountLoader = ({ countdown }: CountLoaderProps) => (
  <div className={styles.countdownContainer}>
    <div className={styles.countdownWrapper}>
      <div className={styles.countdownNumber}>{countdown}</div>
      <div className={styles.countdownGlow}></div>
      <div className={styles.countdownPulse}></div>
      <div className={styles.countdownText}>
        {countdown === 0 ? 'Поехали!' : 'Начинаем через...'}
      </div>
    </div>
    <div className={styles.countdownRing}>
      <svg className={styles.countdownSvg} viewBox="0 0 100 100">
        <circle
          className={styles.countdownCircle}
          cx="50"
          cy="50"
          r="45"
          style={{
            animationDuration: `5s`,
            animationPlayState: countdown > 0 ? 'running' : 'paused',
          }}
        />
      </svg>
    </div>
  </div>
)
