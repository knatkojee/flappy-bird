import type { Request, Response } from 'express'

const mockUsers = new Map<number, { id: number; login: string; theme: string }>(
  [
    [1, { id: 1, login: 'user1', theme: 'light' }],
    [2, { id: 2, login: 'user2', theme: 'dark' }],
  ]
)

export const getTheme = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId // Из middleware

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const user = mockUsers.get(userId)

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

    const user = mockUsers.get(userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    user.theme = theme
    mockUsers.set(userId, user)

    res.json({ theme: user.theme })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
