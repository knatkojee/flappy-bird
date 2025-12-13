import React from 'react'
import styles from './TableCell.module.css'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableCell: React.FC<TableCellProps> = ({
  className = '',
  ...props
}) => <td className={`${styles.cell} ${className}`} {...props} />
