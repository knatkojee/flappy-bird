export interface UserResponse {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export interface UpdateProfileData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
