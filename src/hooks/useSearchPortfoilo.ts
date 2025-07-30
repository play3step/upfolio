import { INTEREST_MAP } from '@/pages/Home'
import type { PortfolioItem } from '@/types/portfolio'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface SearchParams {
  interest: string
  career?: string
  searchKeyword?: string
}

export const useSearchPortfoilo = (portfolio?: PortfolioItem[]) => {
  const [filteredPortfolio, setFilteredPortfolio] = useState(portfolio)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const interest = searchParams.get('interest') ?? 'all'
    const career = searchParams.get('career') ?? ''
    const searchKeyword = searchParams.get('searchKeyword') ?? ''

    handleSearch({
      interest,
      career,
      searchKeyword
    })
  }, [searchParams, portfolio])

  const handleSearch = ({ interest, career, searchKeyword }: SearchParams) => {
    const filtered = (portfolio || []).filter(item => {
      const matchInterest =
        interest === 'all' ||
        item.interest === INTEREST_MAP[interest as keyof typeof INTEREST_MAP]
      const matchCareer = !career || item.career === career
      const matchKeyword =
        !searchKeyword ||
        item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchKeyword.toLowerCase())

      return matchInterest && matchCareer && matchKeyword
    })

    setFilteredPortfolio(filtered)
  }

  return { filteredPortfolio, handleSearch }
}
