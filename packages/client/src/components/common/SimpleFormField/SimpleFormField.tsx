import React from 'react'
import styles from './SimpleFormField.module.css'
import { SimpleFormFieldProps } from '@/types/components'

export const SimpleFormField = ({
  label,
  id,
  ...inputProps
}: SimpleFormFieldProps) => {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={styles.input} {...inputProps} />
    </div>
  )
}
