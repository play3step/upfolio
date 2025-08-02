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
import { useAuth } from '@/hooks/auth/useAuth'

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

  console.log('filteredPortfolio:', filteredPortfolio)

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

    // 좋아요 반영
    if (next) {
      await supabase
        .from('like_table')
        .upsert({ portfolioid: id, userid: authData.id })
    } else {
      await supabase
        .from('like_table')
        .delete()
        .eq('portfolioid', id)
        .eq('userid', authData.id)
    }

    // 좋아요 수 & 관련 정보 다시 fetch (뷰 기반)
    const { data: updated, error } = await supabase
      .from('PortfolioWithLikes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('뷰에서 업데이트된 데이터 가져오기 실패:', error.message)
      return
    }

    // 로컬 상태 반영
    setPortfolio(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ...updated, likeCount: Number(updated.likeCount ?? 0) }
          : p
      )
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
              {...p} // PortfolioItem의 모든 속성을 전달
              key={p.id}
              portfolioid={p.id}
              onToggleBookmark={handleBookmarkToggle}
              onToggleLike={handleLikeToggle}
            />
          ))}
      </div>
    </div>
  )
}
