import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import { ssrHandler, apiHandler } from './ssr-router'
import { initDatabase } from './models'
import themeRoutes from './routes/theme'

const app = express()
app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()
initDatabase()

app.get('/api/health', apiHandler)

// Theme API
app.use('/api', themeRoutes)

// TODO: Добавить реальное API
// app.get('/api/auth/user', getUserHandler)
// app.post('/api/auth/signup', signupHandler)
// app.post('/api/auth/signin', signinHandler)

app.get('*', ssrHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`SSR доступен на: http://localhost:${port}`)
  console.log(`API доступен на: http://localhost:${port}/api/health`)
})

export default app
