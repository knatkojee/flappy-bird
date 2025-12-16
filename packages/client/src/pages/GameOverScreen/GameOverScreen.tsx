import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components'

import classes from './GameOverScreen.module.css'
import { ROUTES } from '@/constants/routes'

export const GameOverScreen = () => {
  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Конец игры</h1>
      <Button className={classes.repeatBtn}>Повторить</Button>
      <Link to={ROUTES.PUBLIC.HOME} className={classes.backBtn}>
        Вернуться в главное меню
      </Link>
    </section>
  )
}
