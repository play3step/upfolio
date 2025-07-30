import Input from '@/components/common/Input'
import S from './Signup.module.css'
import { useSignup } from '@/hooks/auth/useSignup'
import Button from '@/components/common/Button'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export function Signup() {
  const {
    birthDate,
    phone,
    handleBirthChange,
    handlePhoneChange,
    handleSignup
  } = useSignup()

  const { authData } = useContext(AuthContext)

  return (
    <div className={S['signup']}>
      <div className={S['signup__card']}>
        <h1 className={S['signup__title']}>회원가입</h1>
        <p className={S['signup__description']}>
          추가적인 정보를 입력하여 회원가입을 진행해주세요.
        </p>
        <form
          className={S['signup__form']}
          onSubmit={handleSignup}>
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
          <Button type="submit">회원가입</Button>
        </form>
      </div>
    </div>
  )
}
