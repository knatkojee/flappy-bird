import { useState } from 'react'

import { GameOverScreen } from '../GameOverScreen/GameOverScreen'
import styles from './Game.module.css'

const Game = () => {
  const [endGame, setEndGame] = useState(false)

  return <div className={styles.wrapper}>{endGame && <GameOverScreen />}</div>
}

export default Game
