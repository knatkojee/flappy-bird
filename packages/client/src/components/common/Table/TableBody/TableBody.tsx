import React from 'react'
import styles from './TableBody.module.css'
import { TableBodyProps } from '@/types/components'

export const TableBody = ({ className = '', ...props }: TableBodyProps) => (
  <tbody className={`${styles.body} ${className}`} {...props} />
)
