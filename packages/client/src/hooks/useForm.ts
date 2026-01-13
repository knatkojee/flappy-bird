import { useState, useCallback } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Validator } from '@/lib/validators'

type ValidationSchema<T> = Partial<Record<keyof T, Validator>>

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validationSchema?: ValidationSchema<T>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...prev, [name]: value }))

      if (validationSchema && validationSchema[name as keyof T]) {
        const error = validationSchema[name as keyof T]!(value)
        setErrors(prev => ({
          ...prev,
          [name]: error || undefined,
        }))
      }
    },
    [validationSchema]
  )

  const validate = useCallback(() => {
    if (!validationSchema) return true

    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    for (const key in validationSchema) {
      const validator = validationSchema[key]
      if (validator) {
        const error = validator(values[key])
        if (error) {
          newErrors[key] = error
          isValid = false
        }
      }
    }

    setErrors(newErrors)
    return isValid
  }, [values, validationSchema])

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => async (e: FormEvent) => {
      e.preventDefault()

      if (!validate()) return

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate]
  )

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  }
}
