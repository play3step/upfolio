import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

export interface PortfolioItem {
  id: string
  userid: string
  title: string
  content: string
  likecount: number
  viewcount: number
  interest: string
  career: string
  isBookmarked: boolean
}

export const usePortfolio = (userId: string | null) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      // 1. 북마크 가져오기
      const { data: bookmarks, error: bookmarkError } = await supabase
        .from('BookMark')
        .select('portfolioid')
        .eq('userid', userId)

      if (bookmarkError) {
        console.error('Bookmark fetch error:', bookmarkError.message)
        return
      }

      const bookmarkedIds = bookmarks?.map(b => b.portfolioid) || []

      // 2. 포트폴리오 + 유저 정보 가져오기
      const { data: portfolios, error: portfolioError } = await supabase.from(
        'Portfolio'
      ).select('*')

      if (portfolioError) {
        console.error('Portfolio fetch error:', portfolioError.message)
        return
      }

      // 3. 병합해서 isBookmarked 붙이기
      const combined = (portfolios ?? []).map(p => ({
        ...p,
        interest: p.User?.interest || '',
        career: p.User?.career || '',
        isBookmarked: bookmarkedIds.includes(p.id)
      })) as PortfolioItem[]

      setPortfolio(combined)
    }

    fetchData()
  }, [userId])

  return { portfolio, setPortfolio }
}
