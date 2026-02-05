import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/routes'
import './App.css'
import { ApplicationLayout, LoadingSpinner } from '@/components'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HydrationTest from './components/common/HydrationTest/HydrationTest'

const PageLayout = () => {
  return (
    <ApplicationLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          {/* TODO: Убрать тест гидратации */}
          <HydrationTest />
          <AppRoutes />
        </ErrorBoundary>
      </Suspense>
    </ApplicationLayout>
  )
}

function App() {
  // TODO фечить данные юзера
  return (
    <Router>
      <PageLayout />
      <ToastContainer />
    </Router>
  )
}

export default App
