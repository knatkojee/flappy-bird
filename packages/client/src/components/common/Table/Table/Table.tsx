import React from 'react'
import styles from './Table.module.css'
import { TableProps } from '@/types/components'

export const Table = ({ className = '', ...props }: TableProps) => (
  <div className={styles.wrapper}>
    <table className={`${styles.table} ${className}`} {...props} />
  </div>
)
