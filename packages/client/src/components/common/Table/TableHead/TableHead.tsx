import React from 'react'
import styles from './TableHead.module.css'

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export const TableHead: React.FC<TableHeadProps> = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}) => (
  <th
    className={`${styles.head} ${styles[align]} ${
      responsive ? styles[`hidden-${responsive}`] : ''
    } ${className}`}
    {...props}
  />
)
