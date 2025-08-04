import { fetchTempPortfolioItem } from '@/apis/portfolio/tempPortfolio.controller'
import type { PortfolioData } from '@/types/portfolio'
import { omit } from 'lodash'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const omitFields = ['createdAt']

export const useTempPortfolioFromMyPage = (
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>,
  lastSavedDataRef?: React.MutableRefObject<Partial<PortfolioData | null>>,
  setTempPortfolioId?: React.Dispatch<React.SetStateAction<string>>
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

        if (lastSavedDataRef) {
          lastSavedDataRef.current = omit(data, omitFields)
        }

        if (setTempPortfolioId) {
          setTempPortfolioId(data.id)
        }
      } catch (error) {
        console.error('임시 저장된 글 불러오기 실패:', error)
      }
    }

    fetchPortfolioData()
  }, [id, setPortfolioData, setTempPortfolioId, lastSavedDataRef])
}
