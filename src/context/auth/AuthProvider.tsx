import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/context/auth/AuthContext'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import type { UserData } from '@/types/auth'
import { alertConfirm } from '@/utils/alertUtils'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authData, setAuthData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getSession } = useAuthLogin()

  const login = (userData: UserData) => {
    setIsAuth(true)
    setAuthData(userData)
  }
  const logout = async () => {
    const ok = await alertConfirm({
      text: '로그아웃 하시겠습니까?'
    })
    if (ok) {
      setIsAuth(false)
      setAuthData(null)
      localStorage.clear()
    }
  }

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession()
        if (sessionData !== undefined && sessionData !== null) {
          setIsAuth(true)
          setAuthData(sessionData)
        } else {
          setIsAuth(false)
          setAuthData(null)
        }
      } catch (error) {
        console.error('Session fetch error:', error)
        setIsAuth(false)
        setAuthData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSession()
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuth, authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
