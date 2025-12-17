import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react'
import { User } from '@/types/auth'
import { getUser, logout as logoutUser } from '@/api/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { toast } from 'react-toastify'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  refetch: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const currentUser = await getUser()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
      setUser(null)
      toast.success('Вы успешно вышли!')
      navigate(ROUTES.PUBLIC.LOGIN)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }, [navigate])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      refetch: fetchUser,
      logout,
    }),
    [user, isLoading, fetchUser, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
