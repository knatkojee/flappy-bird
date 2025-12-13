import React from 'react'
import styles from './Table.module.css'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string
}

export const Table: React.FC<TableProps> = ({ className = '', ...props }) => (
  <div className={styles.wrapper}>
    <table className={`${styles.table} ${className}`} {...props} />
  </div>
)
