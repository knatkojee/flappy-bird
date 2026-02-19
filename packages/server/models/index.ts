import { Sequelize } from 'sequelize-typescript'
import { User } from './User'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

// TODO подключить к базе данных
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  database: POSTGRES_DB || 'flappy_bird',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  models: [User],
  logging: false,
})

export const initDatabase = async () => {
  try {
    console.log('  ➜ 🎸 Database models initialized (mock mode)')
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

export { User }
