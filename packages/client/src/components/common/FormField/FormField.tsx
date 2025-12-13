import React from 'react'
import styles from './FormField.module.css'
import { Input, Label } from '@/components'

interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  icon: React.ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg'
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  icon: Icon,
  size = 'sm',
  id,
  ...inputProps
}) => {
  return (
    <div className={styles.fieldGroup}>
      <Label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </Label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.inputIcon} />
        <Input id={id} size={size} withIcon {...inputProps} />
      </div>
    </div>
  )
}
