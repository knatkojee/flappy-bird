import React from 'react'
import styles from './TableHeader.module.css'
import { TableHeaderProps } from '@/types/components'

export const TableHeader = ({
  className = '',
  variant = 'default',
  ...props
}: TableHeaderProps) => (
  <thead
    className={`${styles.header} ${
      variant === 'gradient' ? styles.gradient : ''
    } ${className}`}
    {...props}
  />
)
