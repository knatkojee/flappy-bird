import {
  compose,
  email,
  hasCapitalLetter,
  hasDigit,
  maxLength,
  minLength,
  phone,
  required,
} from './rules'

export const loginValidator = compose(
  required(),
  minLength(3),
  maxLength(20),
  value =>
    /^[a-zA-Z0-9_-]+$/.test(value)
      ? null
      : 'Допустимы только латинские буквы, цифры, дефис и подчеркивание',
  value =>
    /^[0-9]+$/.test(value) ? 'Логин не может состоять только из цифр' : null
)

export const passwordValidator = compose(
  required(),
  minLength(8),
  maxLength(40),
  hasCapitalLetter(),
  hasDigit()
)

export const nameValidator = compose(required(), value =>
  /^[A-ZА-Я][a-zа-я-]*$/.test(value)
    ? null
    : 'Первая буква должна быть заглавной, допустимы только буквы и дефис'
)

export const emailValidator = compose(required(), email())

export const phoneValidator = compose(required(), minLength(10), phone())
