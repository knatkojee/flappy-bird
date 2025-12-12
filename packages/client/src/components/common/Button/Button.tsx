import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
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
