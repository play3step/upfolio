import { AuthContext } from '@/context/auth/AuthContext'
import type { UserInfo } from '@/types/portfolio'
import { useContext, useMemo } from 'react'

export const useUserInfo = () => {
  const { authData } = useContext(AuthContext)

  const userInfo: UserInfo | null = useMemo(() => {
    if (!authData) return null

    return {
      id: authData.id,
      email: authData.email,
      nickname: authData.nickname,
      phone: authData.phone ?? '',
      birthDate: authData.birthDate ?? ''
    }
  }, [authData])

  return { userInfo }
}
