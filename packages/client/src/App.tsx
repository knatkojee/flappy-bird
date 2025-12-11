import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/routes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner'
import './App.css'

const PageLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </main>
      <Footer />
    </>
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
