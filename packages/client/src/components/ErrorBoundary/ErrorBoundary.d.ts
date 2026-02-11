import type { ReactNode } from 'react'
import { Component } from 'react'
export declare class ErrorBoundary extends Component<
  {
    children: ReactNode
  },
  {
    hasError: boolean
  }
> {
  constructor(props: { children: ReactNode })
  static getDerivedStateFromError(error: Error): {
    hasError: boolean
  }
  render():
    | string
    | number
    | boolean
    | import('react/jsx-runtime').JSX.Element
    | Iterable<ReactNode>
}
