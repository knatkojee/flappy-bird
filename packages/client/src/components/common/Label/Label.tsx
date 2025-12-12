import React from 'react'
import styles from './Label.module.css'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <label ref={ref} className={`${styles.label} ${className}`} {...props}>
        {children}
      </label>
    )
  }
)

Label.displayName = 'Label'
