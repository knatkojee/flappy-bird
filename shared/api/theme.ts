import axios from 'axios'
import type { AxiosError } from 'axios'
import type { Theme, ThemeResponse } from '../types/auth'

type ErrorResponse = {
  error: string
}

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  withCredentials: true,
})

export const getTheme = async (): Promise<Theme> => {
  try {
    const response = await apiInstance.get<ThemeResponse>('/user/theme')
    return response.data.theme
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.error || 'Произошла ошибка')
  }
}

export const updateTheme = async (theme: Theme): Promise<Theme> => {
  try {
    const response = await apiInstance.put<ThemeResponse>('/user/theme', {
      theme,
    })
    return response.data.theme
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.error || 'Произошла ошибка')
  }
}
