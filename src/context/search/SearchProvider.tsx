import { useContext, useState } from 'react'
import { SearchContext } from './searchContext'

interface SearchContextType {
  keyword: string
  setKeyword: (value: string) => void
}

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyword, setKeyword] = useState('')

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext<SearchContextType>(SearchContext)
  if (!context)
    throw new Error('useSearch must be used within a SearchProvider')
  return context
}
