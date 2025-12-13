import React from 'react'
import styles from './TableHeader.module.css'

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  variant?: 'default' | 'gradient'
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => (
  <thead
    className={`${styles.header} ${
      variant === 'gradient' ? styles.gradient : ''
    } ${className}`}
    {...props}
  />
)
