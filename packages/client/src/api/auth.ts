import apiInstance from './index'
import type { AxiosError } from 'axios'
import type { SignUpData, SignInData, User } from '@/types/auth'

type ErrorResponse = {
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

export const getUser = async (): Promise<User> => {
  try {
    const response = await apiInstance.get<User>('/auth/user')
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const logout = async () => {
  try {
    await apiInstance.post('/auth/logout')
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}
