import React from 'react'
import styles from './TableHeader.module.css'

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  className = '',
  ...props
}) => <thead className={`${styles.header} ${className}`} {...props} />
