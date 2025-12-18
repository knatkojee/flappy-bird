import React from 'react'
import styles from './Table.module.css'

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string
}

export const Table = ({ className = '', ...props }: TableProps) => (
  <div className={styles.wrapper}>
    <table className={`${styles.table} ${className}`} {...props} />
  </div>
)
