import React from 'react'
import classNames from 'classnames'
import styles from './TableFooter.module.css'

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export const TableFooter = ({ className = '', ...props }: TableFooterProps) => (
  <tfoot className={classNames(styles.footer, className)} {...props} />
)
