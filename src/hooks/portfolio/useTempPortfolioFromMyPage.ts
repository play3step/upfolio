import { fetchTempPortfolioItem } from '@/apis/portfolio/fetchTempItem.controller'
import type { PortfolioData } from '@/types/portfolio'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useTempPortfolioFromMyPage = (
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>
) => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!id) return

      try {
        const data = await fetchTempPortfolioItem(id)
        if (!data) return

        setPortfolioData(prev => ({
          ...prev,
          ...data,
          id: data.id
        }))
      } catch (error) {
        console.error('임시 저장된 글 불러오기 실패:', error)
      }
    }

    fetchPortfolioData()
  }, [id, setPortfolioData])
}
