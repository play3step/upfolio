import type { AuthContextType } from './../../types/auth'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const useAuth = () => useContext(AuthContext) as AuthContextType
