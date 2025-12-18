import React from 'react'
import styles from './TableRow.module.css'

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  variant?: 'default' | 'highlighted' | 'header'
}

export const TableRow = ({
  className = '',
  variant = 'default',
  ...props
}: TableRowProps) => (
  <tr
    className={`${styles.row} ${
      variant === 'highlighted' ? styles.highlighted : ''
    } ${variant === 'header' ? styles.headerRow : ''} ${className}`}
    {...props}
  />
)
