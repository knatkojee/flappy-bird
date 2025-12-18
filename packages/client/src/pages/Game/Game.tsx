import { useState } from 'react'
import GameStartScreen from '../GameStartScreen/GameStartScreen'
import styles from './Game.module.css'

const Game = () => {
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    setShowStartScreen(false)
    setGameStarted(true)
    // Тут начинается игра
  }

  const handleBack = () => {
    setShowStartScreen(false)
  }

  return (
    <div className={styles.wrapper}>
      {gameStarted && <div className={styles.content}>Игра идет...</div>}

      <GameStartScreen
        isVisible={showStartScreen}
        onStartGame={handleStartGame}
        onBack={handleBack}
      />
    </div>
  )
}

export default Game
