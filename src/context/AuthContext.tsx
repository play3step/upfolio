import type { AuthContextType } from '@/types/auth'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  authData: null
})
