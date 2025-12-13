import React from 'react'
import styles from './TableBody.module.css'

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableBody: React.FC<TableBodyProps> = ({
  className = '',
  ...props
}) => <tbody className={`${styles.body} ${className}`} {...props} />
