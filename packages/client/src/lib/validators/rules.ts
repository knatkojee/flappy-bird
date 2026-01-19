export type Validator = (value: string) => string | null

export const compose =
  (...validators: Validator[]): Validator =>
  value => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return null
  }

export const required =
  (message = 'Обязательное поле'): Validator =>
  value =>
    value && value.trim() ? null : message

export const minLength =
  (min: number, message?: string): Validator =>
  value =>
    value.length >= min ? null : message || `Минимальная длина ${min} символов`

export const maxLength =
  (max: number, message?: string): Validator =>
  value =>
    value.length <= max ? null : message || `Максимальная длина ${max} символов`

export const email =
  (message = 'Некорректный email'): Validator =>
  value =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message

export const phone =
  (message = 'Некорректный телефон'): Validator =>
  value =>
    /^\+?[\d\s-]{10,15}$/.test(value) ? null : message

export const matches =
  (regex: RegExp, message: string): Validator =>
  value =>
    regex.test(value) ? null : message

export const hasCapitalLetter =
  (message = 'Должна быть хотя бы одна заглавная буква'): Validator =>
  value =>
    /[A-Z]/.test(value) ? null : message

export const hasDigit =
  (message = 'Должна быть хотя бы одна цифра'): Validator =>
  value =>
    /\d/.test(value) ? null : message
