import type { Request, Response } from 'express'
import { User } from '../models'

export const getTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const user = await User.findByPk(userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({ theme: user.theme })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTheme = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId
    const { theme } = req.body

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    if (!theme || !['light', 'dark'].includes(theme)) {
      res.status(400).json({ error: 'Invalid theme value' })
      return
    }

    const user = await User.findByPk(userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    await user.update({ theme })

    res.json({ theme: user.theme })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
