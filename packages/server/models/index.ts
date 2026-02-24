import { Sequelize } from 'sequelize-typescript'
import { User } from './User'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  database: POSTGRES_DB || 'postgres',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  models: [User],
  logging: false,
})

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established')

    // В dev режиме синхронизируем модели
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true })
      console.log('  ✓ Database models synchronized')
    }
  } catch (error) {
    console.error('  ✗ Database connection error:', error)
  }
}

export { User }
