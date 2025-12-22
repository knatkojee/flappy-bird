import React from 'react'
import styles from './Button.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

import classNames from 'classnames'

export function Button({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className
  )

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
