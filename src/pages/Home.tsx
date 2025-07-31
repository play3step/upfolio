import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import { SearchBar } from '@/components/SearchBar'
import { handleToggleBookmark } from '@/apis/bookmark/bookmarkUtils'
import supabase from '@/lib/supabaseClient'

import { useSearchParams } from 'react-router-dom'

import {
  useSearchPortfoilo,
  type SearchParams
} from '@/hooks/useSearchPortfoilo'
import type { PortfolioItem } from '@/types/portfolio'

export const INTEREST_MAP = {
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
  const { authData } = useAuthLogin()
  const { portfolio, setPortfolio } = usePortfolio(authData?.id ?? null)
  const { filteredPortfolio } = useSearchPortfoilo(portfolio)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleSearch = (params: SearchParams) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('searchKeyword', params.searchKeyword ?? '')
    newSearchParams.set('interest', params.interest ?? '')
    newSearchParams.set('career', params.career ?? '')
    if (params.searchKeyword === '') {
      newSearchParams.delete('searchKeyword')
    }
    if (params.interest === 'all') {
      newSearchParams.delete('interest')
    }
    if (params.career === '') {
      newSearchParams.delete('career')
    }
    if (newSearchParams.toString() === '') {
      setSearchParams({})
    } else {
      setSearchParams(newSearchParams)
    }
  }

  const handleBookmarkToggle = async (id: string, next: boolean) => {
    const success = await handleToggleBookmark(id, authData?.id ?? '', next)
    if (success) {
      setPortfolio(prev =>
        prev.map(p => (p.id === id ? { ...p, isBookmarked: next } : p))
      )
    }
  }

  const handleLikeToggle = async (id: string, next: boolean) => {
    if (!authData?.id) return

    // 1. Like 테이블에 반영
    const { error: likeError } = await supabase
      .from('Like')
      .upsert({ portfolioid: id, userid: authData?.id })

    // 2. likeCount 증가/감소
    const { error: rpcError } = await supabase.rpc(
      next ? 'increment_like_count' : 'decrement_like_count',
      { portfolioid: id }
    )

    // 3. 에러 체크
    if (likeError || rpcError) {
      console.error(
        '좋아요 처리 중 오류:',
        likeError?.message,
        rpcError?.message
      )
      return
    }

    if (next) {
      const { error } = await supabase
        .from('BookMark')
        .upsert({ portfolioid: id, userid: authData?.id })
      if (error) console.error('Error adding bookmark:', error.message)
    } else {
      const { error } = await supabase
        .from('BookMark')
        .delete()
        .eq('userid', authData?.id)
        .eq('portfolioid', id)
      if (error) console.error('Error removing bookmark:', error.message)
    }

    setPortfolio(prev =>
      prev.map(p => (p.id === id ? { ...p, isBookmarked: next } : p))
    )
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={styles['portfolio-grid']}>
        {filteredPortfolio && filteredPortfolio.length === 0 && (
          <div>검색 결과가 없습니다.</div>
        )}
        {filteredPortfolio &&
          filteredPortfolio.map((p: PortfolioItem) => (
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
