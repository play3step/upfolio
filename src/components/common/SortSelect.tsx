import { useState, useRef, useEffect } from 'react'
import S from './CareerSelect.module.css'
import downslide from '../../assets/icon/downslide.svg'

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
}

const SORT_OPTIONS = ['좋아요 순', '조회수 순']

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div
      className={S.careerSelect}
      ref={selectRef}
      style={{
        padding: 'var(--sp-4) var(--sp-4)  0 var(--sp-4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
      <button
        className={S.careerSelectButton}
        onClick={() => setIsOpen(!isOpen)}>
        {value || '정렬 기준'}{' '}
        <img
          src={downslide}
          alt="선택하기"
        />
      </button>
      {isOpen && (
        <ul
          className={S.careerSelectList}
          style={{ marginLeft: 'var(--sp-4)', width: '148px' }}>
          {SORT_OPTIONS.map(option => (
            <li
              key={option}
              className={`${S.careerSelectOption} ${
                value === option ? S.selected : ''
              }`}
              onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
