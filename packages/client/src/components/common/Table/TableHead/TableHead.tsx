import React from 'react'
import styles from './TableHead.module.css'

type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
  responsive?: 'sm' | 'md' | 'lg'
}

export const TableHead = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}: TableHeadProps) => (
  <th
    className={`${styles.head} ${styles[align]} ${
      responsive ? styles[`hidden-${responsive}`] : ''
    } ${className}`}
    {...props}
  />
)
