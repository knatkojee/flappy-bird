import styles from './GameStartScreen.module.css'

type TCountLoader = { countdown: number }

export const CountLoader = ({ countdown }: TCountLoader) => (
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

export const Tips = () => (
  <div className={styles.tips}>
    <div className={styles.tip}>
      <span className={styles.tipIcon}>💡</span>
      <span>Нажимайте пробел или кликайте мышкой, чтобы подняться выше</span>
    </div>
    <div className={styles.tip}>
      <span className={styles.tipIcon}>🏆</span>
      <span>
        Каждая пройденная труба ={' '}
        <span className={styles.tipSelect}>+1 очко</span>
      </span>
    </div>
  </div>
)
