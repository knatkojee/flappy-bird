import { useAppSelector } from '@/hooks/useAppSelector'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner'

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)
  const location = useLocation()
  const from = location.state?.from?.pathname || ROUTES.PUBLIC.HOME

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <Outlet />
}
