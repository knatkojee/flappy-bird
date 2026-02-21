export type UserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export type ChangePasswordData = {
  oldPassword: string
  newPassword: string
}

export type UpdateProfileData = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export type UpdateProfileTheme = {
  theme: 'light' | 'dark'
  userId: number
}

export type Theme = 'light' | 'dark'

export type ThemeResponse = {
  theme: Theme
}
