import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, authData } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  if (isAuthenticated && (!authData?.phone || !authData?.birthDate)) {
    return <Navigate to="/signup" />
  }

  return <>{children}</>
}
