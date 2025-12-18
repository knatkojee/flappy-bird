import React from 'react'
import styles from './TableBody.module.css'

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export const TableBody = ({ className = '', ...props }: TableBodyProps) => (
  <tbody className={`${styles.body} ${className}`} {...props} />
)
