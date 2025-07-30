import Input from './common/Input'
import S from './SearchBar.module.css'
import search from '../assets/icon/search.svg'
import RadioGroup from './common/RadioGroup'
import { useState } from 'react'
import CareerSelect from './common/CareerSelect'
import { useDebounce } from '../hooks/useDebounce'
import { type SearchParams } from '@/hooks/useSearchPortfoilo'

const INTEREST_SELECT = [
  { label: '전체', value: 'all' },
  { label: '프론트엔드', value: 'FE' },
  { label: '백엔드', value: 'BE' },
  { label: '풀스택', value: 'FullStack' },
  { label: '모바일', value: 'Mobile' },
  { label: '임베디드', value: 'Embedded' },
  { label: 'UI/UX 디자인', value: 'UIUX' },
  { label: '그래픽 디자인', value: 'Graphic' },
  { label: '모션 디자인', value: 'Motion' },
  { label: '일러스트', value: 'Illustration' }
]

interface SearchBarProps {
  onSearch: (params: SearchParams) => void
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [interest, setInterest] = useState<string>('all')
  const [career, setCareer] = useState('')
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value)
  }

  const handleSearch = () => {
    const params = {
      interest,
      career,
      searchKeyword: debouncedKeyword.trim()
    }
    onSearch(params)
  }

  return (
    <div className={S.container}>
      <div className={S.filters}>
        <div className={S.container2}>
          <div>
            <CareerSelect
              value={career}
              onChange={setCareer}
            />
          </div>
          <div className={S.searchBar}>
            <Input
              id="exInputId"
              type="text"
              placeholder="포트폴리오 검색"
              className={S.searchInput}
              hideLabel
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <button
              type="button"
              className={S.searchIcon}
              onClick={handleSearch}>
              <img
                src={search}
                alt="검색 아이콘"
              />
            </button>
          </div>
        </div>

        <RadioGroup
          label={'지원 분야'}
          options={INTEREST_SELECT}
          name={'searchField'}
          className={S.radioGroup}
          checked={interest}
          onChange={handleRadioChange}
        />
      </div>
    </div>
  )
}
