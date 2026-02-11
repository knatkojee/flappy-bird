import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'

export const render = (url: string) => {
  return ReactDOM.renderToString(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  )
}
