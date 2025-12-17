import React from 'react'
import styles from './Label.module.css'
import { LabelProps } from '@/types/components'

export const Label = ({ className = '', children, ...props }: LabelProps) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  )
}
