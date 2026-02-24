import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import { ssrHandler, apiHandler } from './ssr-router'
import { initDatabase } from './models'
import themeRoutes from './routes/theme'
import {
  logoutHandler,
  signinHandler,
  signupHandler,
  yandexServiceIdHandler,
  yandexSigninHandler,
} from './api/auth'
import {
  changeAvatarHandler,
  changePasswordHandler,
  updateProfileHandler,
} from './api/user'
import { authMiddleware } from './authMiddleware'
import cookieParser from 'cookie-parser'
import type { User } from '@shared/types'
import {
  addUserToLeaderboardHandler,
  getAllLeaderboardHandler,
} from './api/leaderboard'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
)

app.use(express.json())
app.use(cookieParser())

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()
initDatabase()

app.get('/api/health', apiHandler)

// Auth API
app.post('/api/auth/signin', signinHandler)
app.post('/api/auth/signup', signupHandler)
app.post('/api/auth/logout', logoutHandler)

// User API
app.put('/api/user/profile/avatar', authMiddleware, changeAvatarHandler)
app.put('/api/user/profile', authMiddleware, updateProfileHandler)
app.put('/api/user/password', authMiddleware, changePasswordHandler)

// Leaderboard API
app.post('/api/leaderboard', authMiddleware, addUserToLeaderboardHandler)
app.post('/api/leaderboard/all', authMiddleware, getAllLeaderboardHandler)

// OAuth API
app.get('/api/oauth/yandex/service-id', yandexServiceIdHandler)
app.post('/api/oauth/yandex', yandexSigninHandler)

app.get('/api/auth/user', authMiddleware, (req, res) => {
  res.json(req.user)
})

// Theme API
app.use('/api', themeRoutes)

app.get('*', ssrHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`SSR доступен на: http://localhost:${port}`)
  console.log(`API доступен на: http://localhost:${port}/api/health`)
})

export default app
