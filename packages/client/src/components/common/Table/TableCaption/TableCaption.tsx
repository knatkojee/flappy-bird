import React from 'react'
import styles from './TableCaption.module.css'

interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string
}

export const TableCaption: React.FC<TableCaptionProps> = ({
  className = '',
  ...props
}) => <caption className={`${styles.caption} ${className}`} {...props} />
