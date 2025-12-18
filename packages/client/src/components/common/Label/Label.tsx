import React from 'react'
import styles from './Label.module.css'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode
}

export const Label = ({ className = '', children, ...props }: LabelProps) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  )
}
