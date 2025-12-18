import type { ReactNode } from 'react'
import { Component } from 'react'

import classes from './ErrorBoundary.module.css'

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    console.warn(error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h1 className={classes.title}>Что-то пошло не так.</h1>
    }

    return this.props.children
  }
}
