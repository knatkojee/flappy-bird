import React from 'react'
import styles from './TableHead.module.css'

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableHead: React.FC<TableHeadProps> = ({
  className = '',
  ...props
}) => <th className={`${styles.head} ${className}`} {...props} />
