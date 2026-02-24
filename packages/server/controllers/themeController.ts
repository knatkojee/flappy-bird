import type { Request, Response } from 'express'
import { User } from '../models'

export const getTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    let user = await User.findByPk(userId)

    // Если пользователя нет - создаём с дефолтной темой
    if (!user) {
      user = await User.create({
        id: userId,
        login: req.user?.login || `user${userId}`,
        theme: 'light',
      })
    }

    res.json({ theme: user.theme })
  } catch (error) {
    console.error('getTheme error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTheme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id
    const { theme } = req.body

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    if (!theme || !['light', 'dark'].includes(theme)) {
      res.status(400).json({ error: 'Invalid theme value' })
      return
    }

    let user = await User.findByPk(userId)

    // Если пользователя нет - создаём
    if (!user) {
      user = await User.create({
        id: userId,
        login: req.user?.login || `user${userId}`,
        theme,
      })
    } else {
      await user.update({ theme })
    }

    res.json({ theme: user.theme })
  } catch (error) {
    console.error('updateTheme error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
