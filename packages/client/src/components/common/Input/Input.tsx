import React from 'react'
import styles from './Input.module.css'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  withIcon?: boolean
}

export const Input: React.FC<InputProps> = ({
  className = '',
  type = 'text',
  size = 'md',
  withIcon = false,
  ...props
}) => {
  const classes = `${styles.input} ${styles[size]} ${
    withIcon ? styles.withIcon : ''
  } ${className}`

  return <input type={type} className={classes} {...props} />
}
