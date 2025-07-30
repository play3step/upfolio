import { getUserInfo } from '@/apis/portfolio/userInfo.controller'
import type { UserInfo } from '@/types/portfolio'
import { useEffect, useState } from 'react'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo()
      if (info) setUserInfo(info)
    }

    fetchUserInfo()
  }, [])

  return { userInfo }
}
