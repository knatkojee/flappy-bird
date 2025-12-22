import { Link } from 'react-router-dom'
import { Button } from '@/components'

import classes from './GameOverScreen.module.css'
import { ROUTES } from '@/constants/routes'

type GameOverScreenProps = {
  repeatGame: VoidFunction
  isVisible: boolean
}

export const GameOverScreen = ({
  repeatGame,
  isVisible,
}: GameOverScreenProps) => {
  if (!isVisible) return null

  return (
    <section className={classes.container}>
      <article className={classes.card}>
        <h1 className={classes.title}>Конец игры</h1>
        <Button onClick={repeatGame} className={classes.repeatBtn}>
          Повторить
        </Button>
        <Link to={ROUTES.PUBLIC.HOME} className={classes.backBtn}>
          Вернуться в главное меню
        </Link>
      </article>
    </section>
  )
}
