import { useState, useCallback } from 'react'
import styles from './Game.module.css'
import GameProcess from './GameProcess'
import { useAddUserMutation } from '@shared/store/leaderboardApi'
import { useAppSelector } from '@/hooks/useAppSelector'

const Game = () => {
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [showGameOverScreen, setShowGameOverScreen] = useState(false)
  const [score, setScore] = useState(0)

  const { user } = useAppSelector(state => state.auth)

  const [addUserToLeaderBord] = useAddUserMutation()

  const handleStartGame = () => {
    setShowStartScreen(false)
    setShowGameOverScreen(false)
    setScore(0)
  }

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore)
    setShowGameOverScreen(true)

    const dataLeaderBoard = {
      data: {
        name: user?.first_name ?? '',
        secondName: user?.second_name ?? '',
        displayName: user?.display_name ?? '',
        score: finalScore,
      },
      ratingFieldName: 'score',
    }
    addUserToLeaderBord(dataLeaderBoard)
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
