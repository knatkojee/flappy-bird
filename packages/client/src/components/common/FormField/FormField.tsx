import type { ComponentType, InputHTMLAttributes } from 'react'
import styles from './FormField.module.css'
import { Input, Label } from '@/components'

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  icon: ComponentType<{ className?: string }>
  size?: 'sm' | 'md' | 'lg'
}

export const FormField = ({
  label,
  icon: Icon,
  size = 'sm',
  id,
  ...inputProps
}: FormFieldProps) => {
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
