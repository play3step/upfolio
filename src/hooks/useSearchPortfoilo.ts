import { INTEREST_MAP } from '@/pages/Home'
import type { PortfolioItem } from '@/types/portfolio'

import { useEffect, useState } from 'react'

export interface SearchParams {
  interest: string
  career?: string
  keyword?: string
}

export const useSearchPortfoilo = ({
  portfolio
}: {
  portfolio: PortfolioItem[]
}) => {
  const [filteredPortfolio, setFilteredPortfolio] = useState(portfolio)

  useEffect(() => {
    setFilteredPortfolio(portfolio)
  }, [portfolio])

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

    setFilteredPortfolio(filtered)
  }

  return { filteredPortfolio, handleSearch }
}
