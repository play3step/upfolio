import { useState } from 'react'
import { SearchContext } from './SearchContext'

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyword, setKeyword] = useState('')

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  )
}
