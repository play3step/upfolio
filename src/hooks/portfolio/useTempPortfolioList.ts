import { fetchTempPortfolioItem } from '@/apis/portfolio/fetchTempItem.controller'
import { fetchTempPortfolioList } from '@/apis/portfolio/fetchTempList.controller'
import type {
  PortfolioData,
  TempItem,
  ValidationError
} from '@/types/portfolio'
import { useCallback, useEffect, useState } from 'react'

export const useTempPortfolioList = ({
  userId,
  setPortfolioData,
  setErrors
}: {
  userId: string | null
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>
  setErrors: (e: ValidationError) => void
}) => {
  // 사이드 패널 열고 닫기
  const [isSideOpen, setSideOpen] = useState(false)

  const handleOpenSide = () => {
    setSideOpen(true)
  }

  const handleCloseSide = () => {
    setSideOpen(false)
  }

  // 임시저장 목록 불러오기
  const [tempList, setTempList] = useState<TempItem[]>([])

  const fetchTempList = useCallback(async () => {
    if (!userId) return

    try {
      const data = await fetchTempPortfolioList(userId)
      setTempList(data)
    } catch (error) {
      console.error('임시저장 목록 불러오기 실패', error)
    }
  }, [userId])

  useEffect(() => {
    fetchTempList()
  }, [fetchTempList])

  // 임시저장 항목 불러오기
  const handleSelectTempItem = async (id: string) => {
    try {
      const data = await fetchTempPortfolioItem(id)
      if (!data) return

      setErrors({})

      setPortfolioData(prev => ({
        ...prev,
        ...data,
        id: data.id
      }))

      setSideOpen(false)
    } catch (error) {
      console.error('임시저장된 항목 불러오기 실패', error)
    }
  }

  return {
    tempList,
    fetchTempList,
    setTempList,
    isSideOpen,
    handleOpenSide,
    handleCloseSide,
    handleSelectTempItem
  }
}
