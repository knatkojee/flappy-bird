// Импорт клиентского AppWrapper для SSR
// Этот файл нужен для того, чтобы сервер мог импортировать React компоненты из клиента
const AppWrapper = require('../client/src/AppWrapper').default

module.exports = AppWrapper
