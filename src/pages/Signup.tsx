import Input from '@/components/common/Input'
import S from './Signup.module.css'
import { useState } from 'react'

export function Signup() {
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: ''
  })
  const [phone, setPhone] = useState('')

  const handleBirthChange = (
    field: 'year' | 'month' | 'day',
    value: string
  ) => {
    if (value && !/^\d+$/.test(value)) return

    if (field === 'year' && value.length > 4) return
    if (field === 'month' && (parseInt(value) > 12 || value.length > 2)) return
    if (field === 'day' && (parseInt(value) > 31 || value.length > 2)) return

    setBirthDate(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '')

    // 길이에 따라 하이픈 추가
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 7) {
      return numbers.slice(0, 3) + '-' + numbers.slice(3)
    } else {
      return (
        numbers.slice(0, 3) +
        '-' +
        numbers.slice(3, 7) +
        '-' +
        numbers.slice(7, 11)
      )
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatPhoneNumber(value)
    if (formattedValue.length <= 13) {
      setPhone(formattedValue)
    }
  }

  return (
    <div className={S['signup']}>
      <div className={S['signup__card']}>
        <h1 className={S['signup__title']}>회원가입</h1>
        <p className={S['signup__description']}>
          추가적인 정보를 입력하여 회원가입을 진행해주세요.
        </p>
        <form className={S['signup__form']}>
          <Input
            id="exId01"
            label="이메일"
            value="example@github.com"
            readOnly
          />
          <Input
            id="exId02"
            label="이름"
            value="배고파"
            readOnly
          />
          <Input
            id="exId03"
            label="전화번호"
            placeholder="전화번호를 입력해 주세요"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={13}
          />
          <div className={S['birth-input-group']}>
            <label>생년월일</label>
            <div className={S['birth-inputs']}>
              <input
                type="text"
                placeholder="YYYY"
                value={birthDate.year}
                onChange={e => handleBirthChange('year', e.target.value)}
                maxLength={4}
              />
              <span>년</span>
              <input
                type="text"
                placeholder="MM"
                value={birthDate.month}
                onChange={e => handleBirthChange('month', e.target.value)}
                maxLength={2}
              />
              <span>월</span>
              <input
                type="text"
                placeholder="DD"
                value={birthDate.day}
                onChange={e => handleBirthChange('day', e.target.value)}
                maxLength={2}
              />
              <span>일</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
