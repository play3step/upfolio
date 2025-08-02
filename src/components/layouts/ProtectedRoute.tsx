import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, authData } = useContext(AuthContext)
  const page = window.location.pathname

  if (page === '/') {
    // 추가 정보가 없으면 회원가입
    if (isAuthenticated && (!authData?.phone || !authData?.birthDate)) {
      return <Navigate to="/signup" />
    }
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (!authData?.phone || !authData?.birthDate) {
    return <Navigate to="/signup" />
  }

  return <>{children}</>
}
