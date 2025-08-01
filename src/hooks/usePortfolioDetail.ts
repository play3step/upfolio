import { useState, useEffect } from 'react'
import supabase from '@/lib/supabaseClient'

interface PortfolioData {
  id: string
  userId: string
  profileimage: string
  name: string
  birthDate: string
  phone: string
  email: string
  title: string
  content: string
  career: string[]
  interest: string[]
  techStack: string[]
  linkUrl: string
  imageUrls: string[]
  likeCount: number
}

export const usePortfolioDetail = (portfolioId: string | null) => {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        console.error('사용자가 인증되지 않았습니다.', error)
        return
      }
      setUserId(data.user.id)
    }
    fetchUserId()
  }, [])

  // 포트폴리오 데이터 가져오기
  useEffect(() => {
    if (!portfolioId) return

    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('Portfolio')
        .select('*')
        .eq('id', portfolioId)
        .single()

      if (error) {
        console.error('포트폴리오 데이터를 불러오는 중 오류 발생: ', error)
        return
      }

      console.log('raw supabase data:', data)

      setData(data)
    }
    fetchPortfolio()
  }, [portfolioId])

  // 좋아요 상태와 개수 가져오기
  useEffect(() => {
    if (!portfolioId || !userId) return

    const fetchLikeData = async () => {
      try {
        // 좋아요 상태 가져오기
        const { data: likeData, error: likeError } = await supabase
          .from('like_table')
          .select('*', { count: 'exact' })
          .eq('portfolioid', portfolioId)
          .eq('userid', userId)
          .maybeSingle()

        if (likeError && likeError.code !== 'PGRST116') {
          // PGRST116 : No rows found
          console.error('좋아요 상태를 불러오는 중 오류 발생: ', likeError)
          return
        }
        setLike(!!likeData) // 좋아요 상태 설정

        // 좋아요 개수 가져오기
        const { count, error: countError } = await supabase
          .from('like_table')
          .select('*', { count: 'exact' })
          .eq('portfolioid', portfolioId)

        if (countError) {
          console.error('좋아요 개수를 불러오는 중 오류 발생: ', countError)
          return
        }

        setLikeCount(count || 0)
      } catch (error) {
        console.error('좋아요 데이터를 가져오는 중 오류 발생:', error)
      }
    }
    fetchLikeData()
  }, [portfolioId, userId])

  // 북마크 상태 가져오기
  useEffect(() => {
    if (!portfolioId || !userId) return

    const fetchBookmarkStatus = async () => {
      const { data, error } = await supabase
        .from('BookMark')
        .select('*')
        .eq('portfolioid', portfolioId)
        .eq('userid', userId)

      if (error) {
        console.error('북마크 상태를 불러오는 중 오류 발생: ', error)
        return
      }

      setBookmark(data.length > 0)
    }
    fetchBookmarkStatus()
  }, [portfolioId, userId])

  return {
    data,
    like,
    setLike,
    bookmark,
    setBookmark,
    likeCount,
    setLikeCount,
    userId
  }
}
