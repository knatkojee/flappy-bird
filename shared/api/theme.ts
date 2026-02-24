import axios from 'axios'
import type { AxiosError } from 'axios'
import type { Theme, ThemeResponse } from '../types/auth'

type ErrorResponse = {
  error: string
}

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
})

export const getTheme = async (userId: number): Promise<Theme> => {
  try {
    const response = await apiInstance.get<ThemeResponse>('/user/theme', {
      headers: {
        'X-User-Id': userId.toString(),
      },
    })
    return response.data.theme
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.error || 'Произошла ошибка')
  }
}

export const updateTheme = async (
  userId: number,
  theme: Theme
): Promise<Theme> => {
  try {
    const response = await apiInstance.put<ThemeResponse>(
      '/user/theme',
      { theme },
      {
        headers: {
          'X-User-Id': userId.toString(),
        },
      }
    )
    return response.data.theme
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.error || 'Произошла ошибка')
  }
}
