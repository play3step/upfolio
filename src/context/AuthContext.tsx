import type { AuthContextType } from '@/types/auth'
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext<AuthContextType>({
  login: () => {}, // 로그인
  logout: () => {}, // 로그아웃
  isAuthenticated: false // 로그인 여부
})

// 로그인 상태를 제공하는 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false) // 로그인 상태

  const login = () => {
    setIsAuth(true) // 로그인 상태로 변경
  }

  const logout = () => {
    setIsAuth(false) // 로그아웃 상태로 변경
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
