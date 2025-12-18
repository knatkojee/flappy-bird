import React from 'react'
import classNames from 'classnames'
import styles from './Table.module.css'

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string
}

export const Table = ({ className = '', ...props }: TableProps) => (
  <div className={styles.wrapper}>
    <table className={classNames(styles.table, className)} {...props} />
  </div>
)
