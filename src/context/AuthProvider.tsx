import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false)

  const login = (newToken: string) => {
    setIsAuth(true)
    localStorage.setItem('authToken', newToken)

    console.log('로그인 성공:', newToken)
  }

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('authToken')

    console.log('로그아웃 성공')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
