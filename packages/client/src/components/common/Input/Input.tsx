import React from 'react'
import styles from './Input.module.css'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  withIcon?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = '', type = 'text', size = 'md', withIcon = false, ...props },
    ref
  ) => {
    const classes = `${styles.input} ${styles[size]} ${
      withIcon ? styles.withIcon : ''
    } ${className}`

    return <input ref={ref} type={type} className={classes} {...props} />
  }
)

Input.displayName = 'Input'
