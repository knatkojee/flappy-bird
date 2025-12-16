import apiInstance from './index'
import { AxiosError } from 'axios'
import { SignUpData, SignInData } from '@/types/auth'

interface ErrorResponse {
  reason: string
}

export const signup = async (data: SignUpData) => {
  try {
    const response = await apiInstance.post<{ id: number }>(
      '/auth/signup',
      data
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const signin = async (data: SignInData) => {
  try {
    const response = await apiInstance.post<void>('/auth/signin', data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}
