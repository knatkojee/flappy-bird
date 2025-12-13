import React from 'react'
import styles from './TableFooter.module.css'

interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableFooter: React.FC<TableFooterProps> = ({
  className = '',
  ...props
}) => <tfoot className={`${styles.footer} ${className}`} {...props} />
