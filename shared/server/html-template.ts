/**
 * Генерирует HTML страницу с встроенным Redux состоянием
 * @param content Сгенерированный React контент
 * @param initialState Начальное состояние Redux
 * @param title Заголовок страницы
 * @returns HTML строка
 */
export const generateHTML = (
  content: string,
  initialState: any,
  title = 'Flappy Bird Game'
): string => {
  const serializedState = JSON.stringify(initialState)

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="Игра Flappy Bird с SSR и Redux">
</head>
<body>
    <div id="root">${content}</div>
    
    <!-- Встроенное состояние Redux для гидратации на клиенте -->
    <script>
      window.__INITIAL_STATE__ = ${serializedState};
    </script>
    
    <!-- Здесь будут подключены статические файлы -->
    <!-- В production они будут добавлены Vite -->
</body>
</html>`
}
