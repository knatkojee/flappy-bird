import React from 'react'
import styles from './TableRow.module.css'

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export const TableRow: React.FC<TableRowProps> = ({
  className = '',
  ...props
}) => <tr className={`${styles.row} ${className}`} {...props} />
