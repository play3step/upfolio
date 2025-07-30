import { useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import type { PortfolioItem } from '@/types/portfolio'
import { AuthContext } from '@/context/AuthContext'

export const usePortfolio = (userId: string | null) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [bookmarkList, setBookmarkList] = useState<string[]>([])
  const { isAuthenticated } = useContext(AuthContext)

  const handleFetchPortfolio = async () => {
    const { data, error } = await supabase.from('Portfolio').select('*')
    if (error) {
      console.error('Portfolio fetch error:', error.message)
      return
    }
    setPortfolio(data)
  }

  const handleBookmarkList = async () => {
    const { data: bookmarks, error: bookmarkError } = await supabase
      .from('BookMark')
      .select('portfolioid')
      .eq('userid', userId)

    if (bookmarkError) {
      console.error('Bookmark fetch error:', bookmarkError.message)
      return
    }
    setBookmarkList(bookmarks?.map(b => b.portfolioid) || [])
  }

  // 첫 렌더링 시 포트폴리오 가져오기
  useEffect(() => {
    handleFetchPortfolio()
  }, [])

  // 로그인 시 포트폴리오 + 북마크 가져오기
  useEffect(() => {
    if (isAuthenticated) {
      const handleCombinedPortfolio = async () => {
        await handleBookmarkList()
        const combinedPortfolio = portfolio.map(p => ({
          ...p,
          isBookmarked: bookmarkList.includes(p.id)
        }))
        setPortfolio(combinedPortfolio)
      }
      handleCombinedPortfolio()
    }
  }, [isAuthenticated])

  // useEffect(() => {
  //   if (!userId) return

  //   const fetchData = async () => {
  //     // 1. 북마크 가져오기
  //     const { data: bookmarks, error: bookmarkError } = await supabase
  //       .from('BookMark')
  //       .select('portfolioid')
  //       .eq('userid', userId)

  //     if (bookmarkError) {
  //       console.error('Bookmark fetch error:', bookmarkError.message)
  //       return
  //     }

  //     const bookmarkedIds = bookmarks?.map(b => b.portfolioid) || []

  //     // 2. 포트폴리오 + 유저 정보 가져오기
  //     const { data: portfolios, error: portfolioError } = await supabase.from(
  //       'Portfolio'
  //     ).select(`
  //         *,
  //         User:userId
  //         (interest, career)
  //       `)

  //     if (portfolioError) {
  //       console.error('Portfolio fetch error:', portfolioError.message)
  //       return
  //     }

  //     // 3. 병합해서 isBookmarked 붙이기
  //     const combined = (portfolios ?? []).map(p => ({
  //       ...p,
  //       interest: p.User?.interest || '',
  //       career: p.User?.career || '',
  //       isBookmarked: bookmarkedIds.includes(p.id)
  //     })) as PortfolioItem[]

  //     setPortfolio(combined)
  //   }

  //   fetchData()
  // }, [userId])

  return { portfolio, setPortfolio }
}
