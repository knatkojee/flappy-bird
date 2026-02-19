import type { Request, Response, NextFunction } from 'express'

// Расширяем тип Request для добавления userId
declare module 'express-serve-static-core' {
  interface Request {
    userId?: number
  }
}

// TODO: проверка токена или сессии
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Мок: берем userId из заголовка X-User-Id
  const userId = req.headers['x-user-id']

  if (userId) {
    req.userId = Number(userId)
  }

  next()
}
