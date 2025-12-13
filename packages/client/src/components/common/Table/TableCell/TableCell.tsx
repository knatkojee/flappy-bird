import React from 'react'
import styles from './TableCell.module.css'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export const TableCell: React.FC<TableCellProps> = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}) => (
  <td
    className={`${styles.cell} ${styles[align]} ${
      responsive ? styles[`hidden-${responsive}`] : ''
    } ${className}`}
    {...props}
  />
)
