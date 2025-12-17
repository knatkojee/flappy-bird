import React from 'react'
import styles from './TableCaption.module.css'
import { TableCaptionProps } from '@/types/components'

export const TableCaption = ({
  className = '',
  ...props
}: TableCaptionProps) => (
  <caption className={`${styles.caption} ${className}`} {...props} />
)
