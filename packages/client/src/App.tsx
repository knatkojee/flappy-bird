import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/routes'
import './App.css'
import { ApplicationLayout, LoadingSpinner } from '@/components'

const PageLayout: React.FC = () => {
  return (
    <ApplicationLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </ApplicationLayout>
  )
}

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Router>
      <PageLayout />
    </Router>
  )
}

export default App
