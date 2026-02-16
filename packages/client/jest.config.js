import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@shared$': '<rootDir>/../../shared',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(png|jpg|jpeg|gif|webp|svg)$': 'jest-transform-stub',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
