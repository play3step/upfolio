import { useEffect, useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { useSearch } from '@/context/SearchContext'
import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import { SearchBar } from '@/components/SearchBar'
import { handleToggleBookmark } from '@/apis/bookmark/bookmarkUtils'
import supabase from '@/lib/supabaseClient'

export interface SearchParams {
  interest: string
  career?: string
  keyword?: string
}

const INTEREST_MAP = {
  all: '전체',
  FE: '프론트엔드',
  BE: '백엔드',
  FullStack: '풀스택',
  Mobile: '모바일',
  Embedded: '임베디드',
  UIUX: 'UI/UX 디자인',
  Graphic: '그래픽 디자인',
  Motion: '모션 디자인',
  Illustration: '일러스트'
} as const

export const Home = () => {
  const { authData, getSession } = useAuthLogin()
  const [userId, setUserId] = useState<string | null>(null)

  const { portfolio, setPortfolio } = usePortfolio(userId)
  const [filteredPortfolio, setFilteredPortfolio] = useState(portfolio)
  const { keyword } = useSearch()

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    if (authData?.id) setUserId(authData.id)
  }, [authData])

  useEffect(() => {
    setFilteredPortfolio(portfolio)
  }, [portfolio])

  useEffect(() => {
    if (keyword) {
      handleSearch({
        interest: 'all',
        keyword
      })
    }
  }, [keyword])

  const handleSearch = ({ interest, career, keyword }: SearchParams) => {
    const filtered = (portfolio || []).filter(item => {
      const matchInterest =
        interest === 'all' ||
        item.interest === INTEREST_MAP[interest as keyof typeof INTEREST_MAP]
      const matchCareer = !career || item.career === career
      const matchKeyword =
        !keyword ||
        item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.content?.toLowerCase().includes(keyword.toLowerCase())

      return matchInterest && matchCareer && matchKeyword
    })

    console.log('setFilteredPortfolio 호출됨: ', filtered.length)
    setFilteredPortfolio(filtered)
  }

  const handleBookmarkToggle = async (id: string, next: boolean) => {
    const success = await handleToggleBookmark(id, next, userId)
    if (success) {
      setPortfolio(prev =>
        prev.map(p => (p.id === id ? { ...p, isBookmarked: next } : p))
      )
    }
  }

  const handleLikeToggle = async (id: string, next: boolean) => {
    if (!userId) return
  
    // 1. Like 테이블에 반영
    const { error: likeError } = await supabase
      .from('Like') 
      .upsert({ portfolioid: id, userid: userId })
  
    // 2. likeCount 증가/감소
    const { error: rpcError } = await supabase.rpc(
      next ? 'increment_like_count' : 'decrement_like_count',
      { portfolioid: id }
    )
  
    // 3. 에러 체크
    if (likeError || rpcError) {
      console.error('좋아요 처리 중 오류:', likeError?.message, rpcError?.message)
      return
    }
  
    // 4. 최신 likeCount 다시 조회
    const { data, error: fetchError } = await supabase
      .from('Portfolio')
      .select('likeCount')
      .eq('id', id)
      .maybeSingle()
  
    if (fetchError) {
      console.error('likeCount 조회 중 오류:', fetchError.message)
      return
    }
  
    if (data) {
      setPortfolio(prev =>
        prev.map(p =>
          p.id === id ? { ...p, likeCount: data.likeCount } : p
        )
      )
    } else {
      console.warn('likeCount 조회 결과가 없습니다.')
    }
  }
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={styles['portfolio-grid']}>
        {filteredPortfolio.map(p => (
          <PortfolioCard
            key={p.id}
            {...p}
            onToggleBookmark={handleBookmarkToggle}
            onToggleLike={handleLikeToggle}
          />
        ))}
      </div>
    </div>
  )
}
