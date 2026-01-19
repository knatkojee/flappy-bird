import type { InputHTMLAttributes } from 'react'
import styles from './SimpleFormField.module.css'
import classNames from 'classnames'

type SimpleFormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const SimpleFormField = ({
  label,
  id,
  error,
  className,
  ...inputProps
}: SimpleFormFieldProps) => {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={classNames(
          styles.input,
          { [styles.hasError]: !!error },
          className
        )}
        {...inputProps}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
