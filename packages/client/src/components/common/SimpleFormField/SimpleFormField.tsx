import React from 'react'
import styles from './SimpleFormField.module.css'

interface SimpleFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const SimpleFormField: React.FC<SimpleFormFieldProps> = ({
  label,
  id,
  ...inputProps
}) => {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...inputProps} />
    </div>
  )
}
