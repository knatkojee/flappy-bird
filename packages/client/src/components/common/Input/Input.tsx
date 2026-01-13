import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'sm' | 'md' | 'lg'
  withIcon?: boolean
  error?: string
}

export const Input = ({
  className = '',
  type = 'text',
  size = 'md',
  withIcon = false,
  error,
  ...props
}: InputProps) => {
  const classes = classNames(
    styles.input,
    styles[size],
    {
      [styles.withIcon]: withIcon,
      [styles.hasError]: !!error,
    },
    className
  )

  return (
    <div className={styles.container}>
      <input type={type} className={classes} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
