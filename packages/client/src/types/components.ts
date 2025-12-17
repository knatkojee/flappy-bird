import React from 'react'

export type AvatarProps = {
  size?: number
  borderWidth?: number
  borderColor?: string
  shadow?: boolean
  children: React.ReactNode
}

export type AvatarImageProps = {
  src: string
  alt: string
  onError?: () => void
}

export type AvatarFallbackProps = {
  fontSize?: number
  children: React.ReactNode
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export type FormFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label: string
  icon: React.ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg'
}

export type IconProps = {
  className?: string
}

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  size?: 'sm' | 'md' | 'lg'
  withIcon?: boolean
}

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode
}

export type SimpleFormFieldProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
  }

export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export type TableCaptionProps =
  React.HTMLAttributes<HTMLTableCaptionElement> & {
    className?: string
  }

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  variant?: 'default' | 'gradient'
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  variant?: 'default' | 'highlighted' | 'header'
}

export type ApplicationLayoutProps = {
  children: React.ReactNode
}
