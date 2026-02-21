import { BASE_URL } from './config'
import type {
  ChangePasswordData,
  UserResponse,
  UpdateProfileData,
  UpdateProfileTheme,
} from '@/types/user'

export const changePassword = async (
  data: ChangePasswordData
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to change password')
  }
}

export const changeAvatar = async (file: File): Promise<UserResponse> => {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch(`${BASE_URL}/user/profile/avatar`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to change avatar')
  }

  return response.json()
}

export const updateProfile = async (
  data: UpdateProfileData
): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update profile')
  }

  return response.json()
}

export const getThemeProfile = async (
  userId: number
): Promise<{ theme: 'light' | 'dark' }> => {
  const response = await fetch(`${BASE_URL}/user/theme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId.toString(),
    },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to get theme')
  }

  return response.json()
}

export const updateThemeProfile = async (
  data: UpdateProfileTheme
): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/user/theme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': data.userId.toString(),
    },
    credentials: 'include',
    body: JSON.stringify({ theme: data.theme }),
  })

  if (!response.ok) {
    throw new Error('Failed to update profile')
  }

  return response.json()
}
