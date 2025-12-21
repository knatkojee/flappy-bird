import React from 'react'
import classNames from 'classnames'
import styles from './TableBody.module.css'

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string
}

export const TableBody = ({ className = '', ...props }: TableBodyProps) => (
  <tbody className={classNames(styles.body, className)} {...props} />
)
