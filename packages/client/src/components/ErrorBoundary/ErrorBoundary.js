import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
import classes from './ErrorBoundary.module.css';
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.warn(error);
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return _jsx("h1", { className: classes.title, children: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A." });
        }
        return this.props.children;
    }
}
