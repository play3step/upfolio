import type { AuthContextType } from '@/types/auth'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  token: null
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const login = (newToken: string) => {
    setIsAuth(true)
    setToken(newToken)
    localStorage.setItem('authToken', newToken)

    console.log('로그인 성공:', newToken)
  }

  const logout = () => {
    setIsAuth(false)
    setToken(null)
    localStorage.removeItem('authToken')

    console.log('로그아웃 성공')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setIsAuth(true)
      setToken(storedToken)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuth, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}
