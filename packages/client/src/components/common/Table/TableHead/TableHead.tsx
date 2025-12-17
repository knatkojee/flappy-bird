import React from 'react'
import styles from './TableHead.module.css'
import { TableHeadProps } from '@/types/components'

export const TableHead = ({
  className = '',
  align = 'left',
  responsive,
  ...props
}: TableHeadProps) => (
  <th
    className={`${styles.head} ${styles[align]} ${
      responsive ? styles[`hidden-${responsive}`] : ''
    } ${className}`}
    {...props}
  />
)
