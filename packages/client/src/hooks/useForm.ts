import { useState, useCallback } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Validator } from '@/lib/validators'

type ValidationSchema<T> = Partial<Record<keyof T, Validator>>

export function useForm<T extends Record<string, string>>(
  initialValues: Partial<T> = {},
  validationSchema?: ValidationSchema<T>
) {
  const [values, setValues] = useState<T>(() => {
    const initializedValues = { ...initialValues } as T
    if (validationSchema) {
      ;(Object.keys(validationSchema) as Array<keyof T>).forEach(key => {
        if (initializedValues[key] === undefined) {
          initializedValues[key] = '' as T[keyof T]
        }
      })
    }
    return initializedValues
  })

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...prev, [name]: value }))

      if (validationSchema) {
        const validator = validationSchema[name as keyof T]
        if (validator) {
          const error = validator(value)
          setErrors(prev => ({
            ...prev,
            [name]: error || undefined,
          }))
        }
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
