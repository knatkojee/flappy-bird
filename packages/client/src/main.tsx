import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from './store'

const initializeApp = () => {
  const rootElement = document.getElementById('root') as HTMLElement

  const preloadedState =
    typeof window !== 'undefined'
      ? (window as any).__INITIAL_STATE__
      : undefined

  const appStore = createAppStore(preloadedState)

  // Используем createRoot для dev режима (без SSR)
  // Для production с SSR нужно использовать hydrateRoot
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Provider store={appStore}>
        <App />
      </Provider>
    </StrictMode>
  )
}

initializeApp()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-workers.js')
      .then(registration => {
        console.log('SW зарегистрирован:', registration.scope)
      })
      .catch(error => {
        console.log('SW ошибка регистрации:', error)
      })
  })
}
