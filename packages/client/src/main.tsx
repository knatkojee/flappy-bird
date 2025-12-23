import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
