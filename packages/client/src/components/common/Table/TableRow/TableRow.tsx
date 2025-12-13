import React from 'react'
import styles from './TableRow.module.css'

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: 'default' | 'highlighted' | 'header'
}

export const TableRow: React.FC<TableRowProps> = ({
  className = '',
  variant = 'default',
  ...props
}) => (
  <tr
    className={`${styles.row} ${
      variant === 'highlighted' ? styles.highlighted : ''
    } ${variant === 'header' ? styles.headerRow : ''} ${className}`}
    {...props}
  />
)
