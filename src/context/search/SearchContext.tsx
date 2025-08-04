import { createContext } from 'react'

export interface SearchContextType {
  keyword: string
  setKeyword: (value: string) => void
}

export const SearchContext = createContext<SearchContextType>({
  keyword: '',
  setKeyword: () => {}
})
