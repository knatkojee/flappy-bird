import { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchUser } from '@/store/authSlice'
import { signinWithYandex } from '@/api/auth'
import { ROUTES } from '@/constants/routes'
import { toast } from 'react-toastify'

const REDIRECT_URI = 'http://localhost:3000'

export const useYandexAuth = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isCalled = useRef(false)

  useEffect(() => {
    const code = searchParams.get('code')

    if (code && !isCalled.current) {
      isCalled.current = true
      const handleYandexAuth = async () => {
        try {
          await signinWithYandex(code, REDIRECT_URI)
          await dispatch(fetchUser())
          toast.success('Вы успешно вошли через Яндекс!')
          navigate(ROUTES.PUBLIC.HOME)
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message)
          }
        }
      }
      handleYandexAuth()
    }
  }, [searchParams, dispatch, navigate])
}
