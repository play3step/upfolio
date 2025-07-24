import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import type { AuthData } from '@/types/auth'
import { mapUserDataToAuthData } from '@/utils/authMappers'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const { getSession } = useAuthLogin()

  const login = (userData: AuthData) => {
    setIsAuth(true)
    setAuthData(userData)
    console.log('로그인 성공:', userData)
  }

  const logout = () => {
    setIsAuth(false)
    setAuthData(null)
    console.log('로그아웃 성공')

    localStorage.clear()
  }

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession()
      if (sessionData !== undefined && sessionData !== null) {
        setIsAuth(true)
        setAuthData(mapUserDataToAuthData(sessionData))
      } else {
        setIsAuth(false)
        setAuthData(null)
      }
    }

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuth, authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
