import { useAppSelector } from '@/hooks/useAppSelector'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner'

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)
  const location = useLocation()

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.PUBLIC.LOGIN} state={{ from: location }} replace />
    )
  }

  return <Outlet />
}
