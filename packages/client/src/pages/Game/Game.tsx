import { useState } from 'react'
import GameStartScreen from '../GameStartScreen/GameStartScreen'
import styles from './Game.module.css'
import GameProcess from './GameProcess'

const Game = () => {
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  const handleStartGame = () => {
    setShowStartScreen(false)
    setGameStarted(true)
  }

  const handleBack = () => {
    setShowStartScreen(false)
  }

  return (
    <div className={styles.wrapper}>
      {gameStarted && <GameProcess />}

      <GameStartScreen
        isVisible={showStartScreen}
        onStartGame={handleStartGame}
        onBack={handleBack}
      />
    </div>
  )
}

export default Game
