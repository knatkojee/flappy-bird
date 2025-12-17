import { ComponentType } from 'react'

export type PageWithTitleProps<T extends object = object> = {
  component: ComponentType<T>
  title: string
  componentProps?: T
}
