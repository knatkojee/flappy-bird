import React from 'react'
import styles from './Label.module.css'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  )
}
