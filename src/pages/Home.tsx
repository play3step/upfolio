import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import { SearchBar } from '@/components/SearchBar'
import SortSelect from '@/components/common/SortSelect'
import { handleToggleBookmark } from '@/apis/bookmark/bookmarkUtils'
import supabase from '@/lib/supabaseClient'

import { useSearchParams } from 'react-router-dom'
import { useState, useMemo } from 'react'

import {
  useSearchPortfoilo,
  type SearchParams
} from '@/hooks/useSearchPortfoilo'
import type { PortfolioItem } from '@/types/portfolio'

import S from './Home.module.css'

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
  const [sortOption, setSortOption] = useState('좋아요 순')

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

  const sortedPortfolio = useMemo(() => {
    if (!filteredPortfolio) return []

    const sorted = [...filteredPortfolio]

    if (sortOption === '좋아요 순') {
      sorted.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0))
    } else if (sortOption === '조회수 순') {
      sorted.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    }

    return sorted
  }, [filteredPortfolio, sortOption])

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={S.main}>
        <SortSelect
          value={sortOption}
          onChange={setSortOption}
        />

        {sortedPortfolio && sortedPortfolio.length === 0 ? (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100px',
              textAlign: 'center'
            }}>
            검색 결과가 없습니다.
          </span>
        ) : (
          <div className={styles['portfolio-grid']}>
            {sortedPortfolio.map((p: PortfolioItem) => (
              <PortfolioCard
                {...p}
                key={p.id}
                portfolioid={p.id}
                name={p.name}
                onToggleBookmark={handleBookmarkToggle}
                onToggleLike={handleLikeToggle}
                isMine={p.userId === authData?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
