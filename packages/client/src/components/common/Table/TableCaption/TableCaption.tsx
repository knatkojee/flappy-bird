import React from 'react'
import classNames from 'classnames'
import styles from './TableCaption.module.css'

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & {
  className?: string
}

export const TableCaption = ({
  className = '',
  ...props
}: TableCaptionProps) => (
  <caption className={classNames(styles.caption, className)} {...props} />
)
