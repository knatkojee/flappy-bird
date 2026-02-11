import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect } from 'react';
import AppRoutes from './routes/routes';
import './App.css';
import { ApplicationLayout, LoadingSpinner } from '@/components';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchUser } from './store/authSlice';
const PageLayout = () => {
    return (_jsx(ApplicationLayout, { children: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsx(ErrorBoundary, { children: _jsx(AppRoutes, {}) }) }) }));
};
function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx(PageLayout, {}), _jsx(ToastContainer, {})] }));
}
export default App;
