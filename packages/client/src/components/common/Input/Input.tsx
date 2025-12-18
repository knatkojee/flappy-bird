import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: 'sm' | 'md' | 'lg'
  withIcon?: boolean
}

export const Input = ({
  className = '',
  type = 'text',
  size = 'md',
  withIcon = false,
  ...props
}: InputProps) => {
  const classes = classNames(
    styles.input,
    styles[size],
    { [styles.withIcon]: withIcon },
    className
  )

  return <input type={type} className={classes} {...props} />
}
