import { useState } from 'react'

import { GameOverScreen } from '../GameOverScreen/GameOverScreen'
import styles from './Game.module.css'

const Game = () => {
  const [endGame, setEndGame] = useState(false)

  const handleRepeatGame = () => {
    console.log('Repeat game')
  }

  return (
    <div className={styles.wrapper}>
      {endGame && <GameOverScreen repeatGame={handleRepeatGame} />}
    </div>
  )
}

export default Game
