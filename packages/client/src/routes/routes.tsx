import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { usePageTitle } from '@/hooks/usePageTitle'
import { PAGE_TITLES } from '@/constants/pageTitles'
import type { PageWithTitleProps } from './types'
import { ProtectedRoute, PublicRoute } from '@/components'

import Forum from '@/pages/Forum/Forum'
import ForumTopic from '@/pages/ForumTopic/ForumTopic'
import Game from '@/pages/Game/Game'
import Home from '@/pages/Home/Home'
import Leaderboard from '@/pages/Leaderboard/Leaderboard'
import Login from '@/pages/Login/Login'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import Profile from '@/pages/Profile/Profile'
import ProfileEdit from '@/pages/ProfileEdit/ProfileEdit'
import PasswordEdit from '@/pages/PasswordEdit/PasswordEdit'
import Registration from '@/pages/Registration/Registration'

export type RouteKeys = keyof typeof ROUTES

const PageWithTitle = <T extends object = object>({
  component: Component,
  title,
  componentProps,
}: PageWithTitleProps<T>) => {
  usePageTitle(title)
  return Component ? <Component {...(componentProps as T)} /> : null
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.PUBLIC.HOME}
        element={<PageWithTitle component={Home} title={PAGE_TITLES.HOME} />}
      />

      <Route element={<PublicRoute />}>
        <Route
          path={ROUTES.PUBLIC.LOGIN}
          element={
            <PageWithTitle component={Login} title={PAGE_TITLES.LOGIN} />
          }
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
      </Route>

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
        <Route
          path={ROUTES.PROTECTED.PROFILE_EDIT}
          element={
            <PageWithTitle
              component={ProfileEdit}
              title={PAGE_TITLES.PROFILE_EDIT}
            />
          }
        />
        <Route
          path={ROUTES.PROTECTED.PASSWORD_EDIT}
          element={
            <PageWithTitle
              component={PasswordEdit}
              title={PAGE_TITLES.PASSWORD_EDIT}
            />
          }
        />
      </Route>

      <Route
        path={ROUTES.ERRORS.NOT_FOUND}
        element={
          <PageWithTitle
            component={ErrorPage}
            title={PAGE_TITLES.NOT_FOUND}
            componentProps={{ error: '404' }}
          />
        }
      />
      <Route
        path={ROUTES.ERRORS.SERVER_ERROR}
        element={
          <PageWithTitle<{ error: '404' | '500' }>
            component={ErrorPage}
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
