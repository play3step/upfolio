import { useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import type { PortfolioItem } from '@/types/portfolio'
import { AuthContext } from '@/context/auth/AuthContext'

export const usePortfolio = (userId: string | null) => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('PortfolioWithLikes')
        .select('*')

      if (portfolioError) {
        console.error('Portfolio fetch error:', portfolioError.message)
        return
      }

      let bookmarkIds: string[] = []

      if (isAuthenticated && userId) {
        const { data: bookmarks, error: bookmarkError } = await supabase
          .from('BookMark')
          .select('portfolioid')
          .eq('userid', userId)

        if (bookmarkError) {
          console.error('Bookmark fetch error:', bookmarkError.message)
        } else {
          bookmarkIds = bookmarks?.map(b => b.portfolioid) || []
        }
      }

      const mergedPortfolio = portfolioData.map(p => ({
        ...p,
        likeCount: Number(p.likeCount ?? 0),
        interest:
          p.interest && typeof p.interest === 'object'
            ? p.interest
            : typeof p.interest === 'string' && p.interest !== 'null'
              ? { label: p.interest, value: p.interest }
              : { label: '', value: '' },

        career:
          p.career && typeof p.career === 'object'
            ? p.career
            : typeof p.career === 'string' && p.career !== 'null'
              ? { label: p.career, value: p.career }
              : { label: '', value: '' },
        isBookmarked: bookmarkIds.includes(p.id)
      }))

      setPortfolio(mergedPortfolio)
      console.log(portfolioData)
    }

    fetchData()
  }, [isAuthenticated, userId])

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
