import type {
  PortfolioData,
  UserInfo,
  ValidationError
} from '@/types/portfolio'
import { useState } from 'react'

export const usePortfolioReset = ({
  setPortfolioData,
  setErrors,
  userInfo,
  TempData
}: {
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>
  setErrors: (e: ValidationError) => void
  userInfo: UserInfo | null
  TempData: PortfolioData
}) => {
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    const Confirm = window.confirm('작성 중인 내용을 모두 초기화할까요?')
    if (!Confirm) return

    setPortfolioData(prev => ({
      ...TempData,
      id: prev.id,
      userId: prev.userId,
      name: userInfo?.nickname ?? '',
      email: userInfo?.email ?? '',
      phone: userInfo?.phone ?? '',
      birthDate: userInfo?.birthDate ?? '',
      createdAt: new Date().toISOString()
    }))

    setErrors({})
    setResetKey(prev => prev + 1)
  }

  return { resetKey, handleReset }
}
