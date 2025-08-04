import type { AuthContextType } from './../../types/auth'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('어디가 안된거야? AuthContext확인해보자.')
  }
  return context as AuthContextType
}
