import React, { useState, useEffect } from 'react'
import styles from './GameStartScreen.module.css'
import { Button } from '@/components/common/Button/Button'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

import birdStartImg from '@/assets/images/bird-start.png'

interface GameStartScreenProps {
  isVisible: boolean
  onStartGame: () => void
  onBack: () => void
}

const GameStartScreen: React.FC<GameStartScreenProps> = ({
  isVisible,
  onStartGame,
  onBack,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          onStartGame()
          setCountdown(null)
          setIsExiting(false)
        }, 500)
      }, 1000) // Дайте анимации завершиться
      return () => clearTimeout(timer)
    }
  }, [countdown, onStartGame])

  const handleStartClick = () => {
    setCountdown(5)
  }

  const handleBackClick = () => {
    setIsExiting(true)
    setTimeout(() => {
      onBack()
      setIsExiting(false)
    }, 300)
  }

  if (!isVisible && !isExiting) return null

  const overlayStyles = `${styles.overlay} ${isExiting ? styles.exit : ''}`
  const containerStyles = `${styles.container} ${
    isExiting ? styles.containerExit : ''
  }`

  return (
    <div className={overlayStyles}>
      <div className={containerStyles}>
        <img className={styles.containerImg} src={birdStartImg} alt="" />

        <div className={styles.content}>
          <h1 className={styles.title}>Готовы к полету?</h1>
          <p className={styles.subtitle}>
            Проведите птичку сквозь трубы и наберите как можно больше очков!
          </p>

          {/* Счетчик обратного отсчета */}
          {countdown !== null && (
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
                      animationDuration: `5s`, // Фиксированная длительность - 5 секунд
                      animationPlayState: countdown > 0 ? 'running' : 'paused',
                    }}
                  />
                </svg>
              </div>
            </div>
          )}

          {countdown === null && (
            <div className={styles.buttonsContainer}>
              <Button
                variant="primary"
                onClick={handleStartClick}
                className={styles.startButton}>
                <span className={styles.buttonContent}>
                  <span className={styles.buttonIcon}>🎮</span>
                  <span>Начать игру</span>
                </span>
              </Button>

              <Link to={ROUTES.PUBLIC.HOME} className={styles.backLink}>
                <Button
                  variant="outline"
                  onClick={handleBackClick}
                  className={styles.backButton}>
                  <span className={styles.buttonContent}>
                    <span className={styles.buttonIcon}>←</span>
                    <span>Вернуться на главную</span>
                  </span>
                </Button>
              </Link>
            </div>
          )}

          {countdown === null && (
            <div className={styles.tips}>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>💡</span>
                <span>
                  Нажимайте пробел или кликайте мышкой, чтобы подняться выше
                </span>
              </div>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>🏆</span>
                <span>
                  Каждая пройденная труба ={' '}
                  <span className={styles.tipSelect}>+1 очко</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameStartScreen
