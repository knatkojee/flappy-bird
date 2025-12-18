import React from 'react'
import styles from './TableHeader.module.css'

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  variant?: 'default' | 'gradient'
}

export const TableHeader = ({
  className = '',
  variant = 'default',
  ...props
}: TableHeaderProps) => (
  <thead
    className={`${styles.header} ${
      variant === 'gradient' ? styles.gradient : ''
    } ${className}`}
    {...props}
  />
)
