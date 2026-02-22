import type { Request, Response, NextFunction } from 'express'
import type { User } from '@shared/types'
import { yandexApi } from './api/index'

declare module 'express' {
  interface Request {
    user?: User
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ reason: 'Unauthorized - no cookies' })
    }

    const response = await yandexApi.get('/auth/user', {
      headers: {
        cookie: req.headers.cookie,
      },
      withCredentials: true,
      validateStatus: status => status < 500,
    })

    if (response.status !== 200) {
      return res.status(401).json({ reason: 'Unauthorized' })
    }

    req.user = response.data

    return next()
  } catch (err) {
    console.error('authMiddleware error:', err)
    if (err.response) {
      return res.status(err.response.status).json({
        reason: err.response.data?.reason || 'Unauthorized',
      })
    }
    return res.status(500).json({ reason: 'Auth middleware error' })
  }
}
