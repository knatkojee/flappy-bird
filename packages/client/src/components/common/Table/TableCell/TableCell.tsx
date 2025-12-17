import React from 'react'
import styles from './TableCell.module.css'
import { TableCellProps } from '@/types/components'

export const TableCell = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}: TableCellProps) => (
  <td
    className={`${styles.cell} ${styles[align]} ${
      responsive ? styles[`hidden-${responsive}`] : ''
    } ${className}`}
    {...props}
  />
)
