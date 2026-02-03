import { useDispatch } from 'react-redux'

type AppDispatch = any

export const useAppDispatch = () => useDispatch<AppDispatch>()
