import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PAGE_TITLES } from '@/constants/pageTitles';
import { ProtectedRoute, PublicRoute } from '@/components';
import Forum from '@/pages/Forum/Forum';
import ForumTopic from '@/pages/ForumTopic/ForumTopic';
import Game from '@/pages/Game/Game';
import Home from '@/pages/Home/Home';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import Profile from '@/pages/Profile/Profile';
import ProfileEdit from '@/pages/ProfileEdit/ProfileEdit';
import PasswordEdit from '@/pages/PasswordEdit/PasswordEdit';
import Registration from '@/pages/Registration/Registration';
const PageWithTitle = ({ component: Component, title, componentProps, }) => {
    usePageTitle(title);
    return Component ? _jsx(Component, { ...componentProps }) : null;
};
const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: ROUTES.PUBLIC.HOME, element: _jsx(PageWithTitle, { component: Home, title: PAGE_TITLES.HOME }) }), _jsxs(Route, { element: _jsx(PublicRoute, {}), children: [_jsx(Route, { path: ROUTES.PUBLIC.LOGIN, element: _jsx(PageWithTitle, { component: Login, title: PAGE_TITLES.LOGIN }) }), _jsx(Route, { path: ROUTES.PUBLIC.REGISTRATION, element: _jsx(PageWithTitle, { component: Registration, title: PAGE_TITLES.REGISTRATION }) })] }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: ROUTES.PROTECTED.FORUM, element: _jsx(PageWithTitle, { component: Forum, title: PAGE_TITLES.FORUM }) }), _jsx(Route, { path: ROUTES.PROTECTED.FORUM_TOPIC, element: _jsx(PageWithTitle, { component: ForumTopic, title: PAGE_TITLES.FORUM_TOPIC }) }), _jsx(Route, { path: ROUTES.PROTECTED.GAME, element: _jsx(PageWithTitle, { component: Game, title: PAGE_TITLES.GAME }) }), _jsx(Route, { path: ROUTES.PROTECTED.LEADERBOARD, element: _jsx(PageWithTitle, { component: Leaderboard, title: PAGE_TITLES.LEADERBOARD }) }), _jsx(Route, { path: ROUTES.PROTECTED.PROFILE, element: _jsx(PageWithTitle, { component: Profile, title: PAGE_TITLES.PROFILE }) }), _jsx(Route, { path: ROUTES.PROTECTED.PROFILE_EDIT, element: _jsx(PageWithTitle, { component: ProfileEdit, title: PAGE_TITLES.PROFILE_EDIT }) }), _jsx(Route, { path: ROUTES.PROTECTED.PASSWORD_EDIT, element: _jsx(PageWithTitle, { component: PasswordEdit, title: PAGE_TITLES.PASSWORD_EDIT }) })] }), _jsx(Route, { path: ROUTES.ERRORS.NOT_FOUND, element: _jsx(PageWithTitle, { component: ErrorPage, title: PAGE_TITLES.NOT_FOUND, componentProps: { error: '404' } }) }), _jsx(Route, { path: ROUTES.ERRORS.SERVER_ERROR, element: _jsx(PageWithTitle, { component: ErrorPage, title: PAGE_TITLES.NOT_FOUND, componentProps: { error: '500' } }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: ROUTES.ERRORS.NOT_FOUND, replace: true }) })] }));
};
export default AppRoutes;
