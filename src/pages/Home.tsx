import { useContext, useEffect } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import supabase from '@/lib/supabaseClient'
import { SearchBar } from '@/components/SearchBar'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

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
  const { authData, getSession } = useAuthLogin()
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const { portfolio } = usePortfolio(authData?.id ?? null)
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

  useEffect(() => {
    getSession()
    if (authData && (!authData.phone || !authData.birthDate)) {
      navigate('/signup')
    }
  }, [authData?.phone, authData?.birthDate, isAuthenticated])

  const handleToggleBookmark = async (id: string, next: boolean) => {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    const userId = user?.id

    if (!userId) {
      console.error('User not authenticated')
      return
    }

    if (next) {
      const { error } = await supabase
        .from('BookMark')
        .upsert({ portfolioid: id, userid: userId })
      if (error) console.error('Error adding bookmark:', error.message)
    } else {
      const { error } = await supabase
        .from('BookMark')
        .delete()
        .eq('userid', userId)
        .eq('portfolioid', id)
      if (error) console.error('Error removing bookmark:', error.message)
    }
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
              onToggleBookmark={handleToggleBookmark}
            />
          ))}
      </div>
    </div>
  )
}
