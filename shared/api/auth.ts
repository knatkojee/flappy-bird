import axios from 'axios'
import type { AxiosError } from 'axios'
import type { SignUpData, SignInData, User } from '../types/auth'

type ErrorResponse = {
  reason: string
}

const apiInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
})

export const signup = async (data: SignUpData): Promise<{ id: number }> => {
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

export const signin = async (data: SignInData): Promise<void> => {
  try {
    await apiInstance.post<void>('/auth/signin', data)
    return
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

export const logout = async (): Promise<void> => {
  try {
    await apiInstance.post('/auth/logout')
    return
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const getYandexServiceId = async (redirectUri: string) => {
  try {
    const response = await apiInstance.get<{ service_id: string }>(
      '/oauth/yandex/service-id',
      {
        params: {
          redirect_uri: redirectUri,
        },
      }
    )
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const signinWithYandex = async (code: string, redirectUri: string) => {
  try {
    const response = await apiInstance.post<void>('/oauth/yandex', {
      code,
      redirect_uri: redirectUri,
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}
