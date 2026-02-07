import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import styles from './GameStartScreen.module.css'
import { Button } from '@/components/common/Button/Button'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { CountLoader } from './CountLoader/CountLoader'
import { Tips } from './Tips/Tips'

import birdStartImg from '@/assets/images/bird-start.png'
import { useGamepadPlay } from '@/hooks/useGamepad'

type GameStartScreenProps = {
  isVisible: boolean
  onStartGame: VoidFunction
  onBack: VoidFunction
}

const GameStartScreen = ({
  isVisible,
  onStartGame,
  onBack,
}: GameStartScreenProps) => {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [selectedButton, setSelectedButton] = useState<'start' | 'home' | null>(
    null
  )

  useEffect(() => {
    if (countdown === null || countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    if (countdown === 0) {
      setIsExiting(true)
      const timer = setTimeout(() => {
        onStartGame()
        setCountdown(null)
        setIsExiting(false)
      }, 500)

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

  useGamepadPlay(
    () => {
      if (countdown !== null) return

      if (selectedButton === 'start') {
        handleStartClick()
      } else if (selectedButton === 'home') {
        handleBackClick()
      }
    },
    isVisible,

    buttonIndex => {
      if (buttonIndex === 12) {
        // 12 - номер стрелки вниз на джойстике
        setSelectedButton('start')
      }

      if (buttonIndex === 13) {
        // 13 - номер стрелки вверх на джойстике
        setSelectedButton('home')
      }
    }
  )

  if (!isVisible && !isExiting) return null

  const overlayStyles = classNames(styles.overlay, { [styles.exit]: isExiting })
  const containerStyles = classNames(styles.container, {
    [styles.containerExit]: isExiting,
  })

  return (
    <div className={overlayStyles}>
      <div className={containerStyles}>
        <img className={styles.containerImg} src={birdStartImg} alt="" />

        <div className={styles.content}>
          <h1 className={styles.title}>Готовы к полету?</h1>
          <p className={styles.subtitle}>
            Проведите птичку сквозь трубы и наберите как можно больше очков!
          </p>

          {countdown !== null && <CountLoader countdown={countdown} />}

          {countdown === null && (
            <>
              <div className={styles.buttonsContainer}>
                <Button
                  variant="primary"
                  onClick={handleStartClick}
                  className={classNames(styles.startButton, {
                    [styles.selected]: selectedButton === 'start',
                  })}>
                  <span className={styles.buttonContent}>
                    <span className={styles.buttonIcon}>🎮</span>
                    <span>Начать игру</span>
                  </span>
                </Button>

                <Link to={ROUTES.PUBLIC.HOME} className={styles.backLink}>
                  <Button
                    variant="outline"
                    onClick={handleBackClick}
                    className={classNames(styles.backButton, {
                      [styles.selected]: selectedButton === 'home',
                    })}>
                    <span className={styles.buttonContent}>
                      <span className={styles.buttonIcon}>←</span>
                      <span>Вернуться на главную</span>
                    </span>
                  </Button>
                </Link>
              </div>
              <Tips />
            </>
          )}

          {/* {countdown === null && <Tips />} */}
        </div>
      </div>
    </div>
  )
}

export default GameStartScreen
