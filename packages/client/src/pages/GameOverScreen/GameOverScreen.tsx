import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components'

import classes from './GameOverScreen.module.css'
import { ROUTES } from '@/constants/routes'
import { useGamepadPlay } from '@/hooks/useGamepad'

type GameOverScreenProps = {
  score: number
  repeatGame: VoidFunction
  isVisible: boolean
}

export const GameOverScreen = ({
  score,
  repeatGame,
  isVisible,
}: GameOverScreenProps) => {
  const navigate = useNavigate()
  const [selectedButton, setSelectedButton] = useState<
    'repeat' | 'home' | null
  >(null)

  useGamepadPlay(
    () => {
      if (selectedButton === 'repeat') {
        repeatGame()
      } else if (selectedButton === 'home') {
        navigate(ROUTES.PUBLIC.HOME)
      }
    },
    isVisible,

    buttonIndex => {
      if (buttonIndex === 14) {
        // 14 - номер стрелки влево на джойстике
        setSelectedButton('repeat')
      }

      if (buttonIndex === 15) {
        // 15 - номер стрелки вправо на джойстике
        setSelectedButton('home')
      }
    }
  )

  if (!isVisible) return null

  return (
    <section className={classes.container}>
      <article className={classes.card}>
        <h1 className={classes.title}>Конец игры. Ваш счет: {`${score}`}</h1>
        <Button
          onClick={repeatGame}
          className={`${classes.repeatBtn} ${
            selectedButton === 'repeat' ? classes.selected : ''
          }`}
          size="sm">
          Повторить
        </Button>
        <Link
          to={ROUTES.PUBLIC.HOME}
          className={`${classes.backBtn} ${
            selectedButton === 'home' ? classes.selected : ''
          }`}>
          Вернуться в главное меню
        </Link>
      </article>
    </section>
  )
}
