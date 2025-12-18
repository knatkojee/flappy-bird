import React from 'react'
import styles from './TableFooter.module.css'

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export const TableFooter = ({ className = '', ...props }: TableFooterProps) => (
  <tfoot className={`${styles.footer} ${className}`} {...props} />
)
