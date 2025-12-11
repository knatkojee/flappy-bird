import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { usePageTitle } from '../hooks/usePageTitle'
import { PAGE_TITLES } from '../constants/pageTitles'
import { PageWithTitleProps } from './types'

const Forum = lazy(() => import('../pages/Forum'))
const ForumTopic = lazy(() => import('../pages/ForumTopic'))
const Game = lazy(() => import('../pages/Game'))
const Home = lazy(() => import('../pages/Home'))
const Leaderboard = lazy(() => import('../pages/Leaderboard'))
const Login = lazy(() => import('../pages/Login'))
const NotFound = lazy(() => import('../pages/ErrorPage'))
const Profile = lazy(() => import('../pages/Profile'))
const Registration = lazy(() => import('../pages/Registration'))

export type RouteKeys = keyof typeof ROUTES

const PageWithTitle = <T extends object = object>({
  component: Component,
  title,
  componentProps,
}: PageWithTitleProps<T>) => {
  usePageTitle(title)
  return Component ? <Component {...(componentProps as T)} /> : null
}

const ProtectedRoute = () => {
  //   const { isAuthenticated } = useAuth() // TODO: реализовать запрос
  const isAuthenticated = false

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />
  }

  return <Outlet />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.PUBLIC.HOME}
        element={<PageWithTitle component={Home} title={PAGE_TITLES.HOME} />}
      />
      <Route
        path={ROUTES.PUBLIC.LOGIN}
        element={<PageWithTitle component={Login} title={PAGE_TITLES.LOGIN} />}
      />
      <Route
        path={ROUTES.PUBLIC.REGISTRATION}
        element={
          <PageWithTitle
            component={Registration}
            title={PAGE_TITLES.REGISTRATION}
          />
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path={ROUTES.PROTECTED.FORUM}
          element={
            <PageWithTitle component={Forum} title={PAGE_TITLES.FORUM} />
          }
        />
        <Route
          path={ROUTES.PROTECTED.FORUM_TOPIC}
          element={
            <PageWithTitle
              component={ForumTopic}
              title={PAGE_TITLES.FORUM_TOPIC}
            />
          }
        />
        <Route
          path={ROUTES.PROTECTED.GAME}
          element={<PageWithTitle component={Game} title={PAGE_TITLES.GAME} />}
        />
        <Route
          path={ROUTES.PROTECTED.LEADERBOARD}
          element={
            <PageWithTitle
              component={Leaderboard}
              title={PAGE_TITLES.LEADERBOARD}
            />
          }
        />
        <Route
          path={ROUTES.PROTECTED.PROFILE}
          element={
            <PageWithTitle component={Profile} title={PAGE_TITLES.PROFILE} />
          }
        />
      </Route>

      <Route
        path={ROUTES.ERRORS.NOT_FOUND}
        element={
          <PageWithTitle
            component={NotFound}
            title={PAGE_TITLES.NOT_FOUND}
            componentProps={{ error: '404' }}
          />
        }
      />
      <Route
        path={ROUTES.ERRORS.SERVER_ERROR}
        element={
          <PageWithTitle<{ error: '404' | '500' }>
            component={NotFound}
            title={PAGE_TITLES.NOT_FOUND}
            componentProps={{ error: '500' }}
          />
        }
      />
      <Route
        path="*"
        element={<Navigate to={ROUTES.ERRORS.NOT_FOUND} replace />}
      />
    </Routes>
  )
}

export default AppRoutes
