import React from 'react'
import styles from './TableCell.module.css'

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

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
