import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

/**
 * Рендерит React приложение на сервере для указанного URL
 * @param url URL запроса
 * @param store Redux store с предзагруженными данными
 * @param AppComponent React компонент приложения
 * @returns HTML строка с отрендеренным приложением
 */
export const renderApp = (
  url: string,
  store: any,
  AppComponent: any
): string => {
  try {
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <AppComponent />
        </StaticRouter>
      </Provider>
    )

    return html
  } catch (error) {
    console.error('Ошибка рендера:', error)
    throw error
  }
}
