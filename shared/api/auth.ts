import type { AxiosError } from 'axios'
import type { SignUpData, SignInData, User } from '../types/auth'

type ErrorResponse = {
  reason: string
}

// TODO: убрать моки
const createMockApiInstance = () => {
  return {
    post: async <T>(url: string, data?: any): Promise<{ data: T }> => {
      if (url === '/auth/signup') {
        return { data: { id: 1 } as T }
      }
      if (url === '/auth/signin') {
        return { data: {} as T }
      }
      return { data: {} as T }
    },
  }
}

const mockApiInstance = createMockApiInstance()

export const signup = async (data: SignUpData): Promise<{ id: number }> => {
  try {
    const response = await mockApiInstance.post<{ id: number }>(
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
    await mockApiInstance.post<void>('/auth/signin', data)
    return
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const getUser = async (): Promise<User> => {
  try {
    // TODO: запрос к API
    const mockUser: User = {
      id: 1,
      first_name: 'Иван',
      second_name: 'Иванов',
      display_name: null,
      login: 'ivanov',
      email: 'ivan@example.com',
      phone: '+79001234567',
      avatar: null,
    }
    return mockUser
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}

export const logout = async (): Promise<void> => {
  try {
    await mockApiInstance.post('/auth/logout')
    return
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>
    throw new Error(axiosError.response?.data?.reason || 'Произошла ошибка')
  }
}
