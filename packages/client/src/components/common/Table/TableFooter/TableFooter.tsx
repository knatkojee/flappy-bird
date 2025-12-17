import React from 'react'
import styles from './TableFooter.module.css'
import { TableFooterProps } from '@/types/components'

export const TableFooter = ({ className = '', ...props }: TableFooterProps) => (
  <tfoot className={`${styles.footer} ${className}`} {...props} />
)
