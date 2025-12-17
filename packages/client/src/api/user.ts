import { BASE_URL } from './config'

interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

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
