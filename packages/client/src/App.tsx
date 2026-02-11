import { Suspense, useEffect } from 'react'
import AppRoutes from './routes/routes'
import './App.css'
import { ApplicationLayout, LoadingSpinner } from './components'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchUser } from './store/authSlice'

const PageLayout = () => {
  return (
    <ApplicationLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Suspense>
    </ApplicationLayout>
  )
}

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <>
      <PageLayout />
      <ToastContainer />
    </>
  )
}

export default App
