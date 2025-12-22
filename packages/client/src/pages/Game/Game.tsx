import { useState } from 'react'
import GameStartScreen from '../GameStartScreen/GameStartScreen'
import { GameOverScreen } from '../GameOverScreen/GameOverScreen'
import styles from './Game.module.css'

const Game = () => {
  const [showStartScreen, setShowStartScreen] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndGameScreen, setShowEndGameScreen] = useState(true)

  const handleStartGame = () => {
    setShowStartScreen(false)
    setGameStarted(true)
    // Тут начинается игра
  }

  const handleBack = () => {
    setShowStartScreen(false)
  }

  const handleRepeatGame = () => {
    setGameStarted(true)
    setShowEndGameScreen(false)
  }

  return (
    <div className={styles.wrapper}>
      {gameStarted && <div className={styles.content}>Игра идет...</div>}

      <GameStartScreen
        isVisible={showStartScreen}
        onStartGame={handleStartGame}
        onBack={handleBack}
      />

      <GameOverScreen
        isVisible={showEndGameScreen}
        repeatGame={handleRepeatGame}
      />
    </div>
  )
}

export default Game
