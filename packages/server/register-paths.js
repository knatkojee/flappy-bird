// Регистрация путей для ts-node
const tsConfigPaths = require('tsconfig-paths')
const path = require('path')

// Игнорируем изображения и другие статические файлы
const extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.eot']
extensions.forEach(ext => {
  require.extensions[ext] = () => ({})
})

// Регистрируем пути для сервера
tsConfigPaths.register({
  baseUrl: __dirname,
  paths: {
    '@/*': [path.resolve(__dirname, '../client/src/*')],
    '@shared': [path.resolve(__dirname, '../../shared')],
    '@shared/*': [path.resolve(__dirname, '../../shared/*')],
    '@server/*': [path.resolve(__dirname, './*')],
  },
})
