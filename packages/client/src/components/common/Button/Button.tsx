import React from 'react'
import styles from './Button.module.css'
import { ButtonProps } from '@/types/components'

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
