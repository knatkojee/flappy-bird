import React from 'react'
import styles from './TableCaption.module.css'

type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement> & {
  className?: string
}

export const TableCaption = ({
  className = '',
  ...props
}: TableCaptionProps) => (
  <caption className={`${styles.caption} ${className}`} {...props} />
)
