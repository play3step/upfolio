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
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const interest = searchParams.get('interest') ?? 'all'
    const career = searchParams.get('career') ?? ''
    const searchKeyword = searchParams.get('searchKeyword') ?? ''
    const newSearchParams = new URLSearchParams(searchParams)

    if (searchKeyword === '') {
      newSearchParams.delete('searchKeyword')
    }
    if (interest === 'all') {
      newSearchParams.delete('interest')
    }
    if (career === '') {
      newSearchParams.delete('career')
    }

    if (newSearchParams.toString() === '') {
      setSearchParams({})
    } else {
      setSearchParams(newSearchParams)
    }

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
        item.interest.label?.includes(
          INTEREST_MAP[interest as keyof typeof INTEREST_MAP]
        )
      const matchCareer = !career || item.career.label === career
      const matchKeyword =
        !searchKeyword ||
        item.title?.toLowerCase().includes(searchKeyword.toLowerCase())

      return matchInterest && matchCareer && matchKeyword
    })

    // 데이터 변환
    const transformed = filtered.map(item => ({
      ...item,
      interest: {
        label: item.interest.label || '알 수 없음',
        value: item.interest.value || 'unknown'
      },
      career: {
        label: item.career.label || '알 수 없음',
        value: item.career.value || 'unknown'
      }
    }))

    setFilteredPortfolio(transformed)
  }

  return { filteredPortfolio, handleSearch }
}
