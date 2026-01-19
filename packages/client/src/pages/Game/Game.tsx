import { useState, useCallback } from 'react'
import styles from './Game.module.css'
import GameProcess from './GameProcess'

const Game = () => {
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [showGameOverScreen, setShowGameOverScreen] = useState(false)
  const [score, setScore] = useState(0)

  const handleStartGame = () => {
    setShowStartScreen(false)
    setShowGameOverScreen(false)
    setScore(0)
  }

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore)
    setShowGameOverScreen(true)
  }, [])

  const handleBack = () => {
    setShowStartScreen(false)
  }

  return (
    <div className={styles.wrapper}>
      <GameProcess
        showStartScreen={showStartScreen}
        showGameOverScreen={showGameOverScreen}
        score={score}
        onStartGame={handleStartGame}
        onRestartGame={handleStartGame}
        onGameOver={handleGameOver}
        onBack={handleBack}
      />
    </div>
  )
}

export default Game
