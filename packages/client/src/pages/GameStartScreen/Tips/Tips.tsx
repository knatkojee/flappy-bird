import styles from '../GameStartScreen.module.css'

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
