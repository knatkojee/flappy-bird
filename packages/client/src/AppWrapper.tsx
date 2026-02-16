import type { ReactNode } from 'react'
import { Suspense, useEffect } from 'react'
import AppRoutes from './routes/routes'
import './App.css'
import { ApplicationLayout, LoadingSpinner } from '@/components'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchUser } from '@shared'

const PageLayout = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

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

type AppWrapperProps = {
  children?: ReactNode
}

function AppWrapper({ children }: AppWrapperProps) {
  return (
    <>
      {children || <PageLayout />}
      <ToastContainer />
    </>
  )
}

export default AppWrapper
