import { useContext, useEffect, useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { useSearch } from '@/context/SearchContext'
import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import supabase from '@/lib/supabaseClient'
import { SearchBar } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

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
  const { isAuthenticated } = useContext(AuthContext)
  const [userId, setUserId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { portfolio, setPortfolio } = usePortfolio(userId)
  const [filteredPortfolio, setFilteredPortfolio] = useState(portfolio)
  const { keyword } = useSearch()
  console.log(authData)
  useEffect(() => {
    getSession()
    if (authData && (!authData.phone || !authData.birthDate)) {
      navigate('/signup')
    }
  }, [authData?.phone, authData?.birthDate, isAuthenticated])

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

    setPortfolio(prev =>
      prev.map(p => (p.id === id ? { ...p, isBookmarked: next } : p))
    )
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={styles['portfolio-grid']}>
        {filteredPortfolio.map(p => (
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
