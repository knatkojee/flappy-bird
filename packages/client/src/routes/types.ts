import { ComponentType } from 'react'

export interface PageWithTitleProps<T extends object = object> {
  component: ComponentType<T>
  title: string
  componentProps?: T
}
