import React from 'react'
import styles from './TableRow.module.css'
import { TableRowProps } from '@/types/components'

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
