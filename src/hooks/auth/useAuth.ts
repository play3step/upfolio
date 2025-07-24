import type { AuthContextType } from './../../types/auth'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('어디가 안된거야? AuthContext확인해보자.')
  }
  console.log('useAuth 호출됨:', context)
  return context as AuthContextType
}
