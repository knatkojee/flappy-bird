import type { ComponentType } from 'react'
export declare type PageWithTitleProps<T extends object = object> = {
  component: ComponentType<T>
  title: string
  componentProps?: T
}
