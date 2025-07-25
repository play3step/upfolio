import { useState, useRef, useEffect } from 'react'
import S from './CareerSelect.module.css'
import downslide from '../../assets/icon/downslide.svg'

interface CareerSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function CareerSelect({ value, onChange }: CareerSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const options = ['신입', '경력']
  const selectRef = useRef<HTMLDivElement | null>(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
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
      ref={selectRef}>
      <button
        className={S.careerSelectButton}
        onClick={() => setIsOpen(!isOpen)}>
        {value || '경력 수준'}{' '}
        <img
          src={downslide}
          alt="선택하기"
        />
      </button>
      {isOpen && (
        <ul className={S.careerSelectList}>
          {options.map(opt => (
            <li
              key={opt}
              className={`${S.careerSelectOption} ${
                value === opt ? 'selected' : ''
              }`}
              onClick={() => handleSelect(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
