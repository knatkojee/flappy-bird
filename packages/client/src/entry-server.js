import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
export const render = (url) => {
    return ReactDOM.renderToString(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(StaticRouter, { location: url, children: _jsx(App, {}) }) }) }));
};
