import { useState, useEffect, useContext } from 'react'
import supabase from '@/lib/supabaseClient'
import type { PortfolioData } from '@/types/portfolio'
import {
  getPortfolio,
  getLikeStatus,
  viewCountPortfolio,
  getLikeCount
} from '@/apis/portfolio/portfolio.controller'
import { AuthContext } from '@/context/auth/AuthContext'

export const usePortfolioDetail = (portfolioId: string | null) => {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const { authData } = useContext(AuthContext)

  // 포트폴리오 데이터 가져오기
  useEffect(() => {
    if (!portfolioId) return

    const fetchPortfolio = async () => {
      const data = await getPortfolio(portfolioId)
      setData(data)

      await viewCountPortfolio(portfolioId, data.viewCount || 0)
    }

    fetchPortfolio()
  }, [portfolioId])

  // 좋아요 상태와 개수 가져오기
  useEffect(() => {
    if (!portfolioId || !authData?.id) return

    const fetchLikeData = async () => {
      try {
        // 좋아요 상태 가져오기
        const likeData = await getLikeStatus(portfolioId, authData?.id)
        setLike(!!likeData) // 좋아요 상태 설정

        // 좋아요 개수 가져오기
        const count = await getLikeCount(portfolioId)
        setLikeCount(count)
      } catch (error) {
        console.error('좋아요 데이터를 가져오는 중 오류 발생:', error)
      }
    }
    fetchLikeData()
  }, [portfolioId, authData?.id])

  // 북마크 상태 가져오기
  useEffect(() => {
    if (!portfolioId || !authData?.id) return

    const fetchBookmarkStatus = async () => {
      const { data, error } = await supabase
        .from('BookMark')
        .select('*')
        .eq('portfolioid', portfolioId)
        .eq('userid', authData?.id)

      if (error) {
        console.error('북마크 상태를 불러오는 중 오류 발생: ', error)
        return
      }

      setBookmark(data.length > 0)
    }
    fetchBookmarkStatus()
  }, [portfolioId, authData?.id])

  return {
    data,
    like,
    setLike,
    bookmark,
    setBookmark,
    likeCount,
    setLikeCount
  }
}
