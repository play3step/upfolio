import { signupUser } from '@/apis/user/signup.controller'

import { AuthContext } from '@/context/auth/AuthContext'
import { formatPhoneNumber } from '@/utils/format'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alertSuccess } from '@/utils/alertUtils'
export const useSignup = () => {
  const { authData, login } = useContext(AuthContext)

  const [nickname, setNickname] = useState(authData?.nickname ?? '')
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: ''
  })
  const [phone, setPhone] = useState('')

  const navigate = useNavigate()

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatPhoneNumber(value)
    if (formattedValue.length <= 13) {
      setPhone(formattedValue)
    }
  }
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!phone || !birthDate.year || !birthDate.month || !birthDate.day) {
      alert('모든 필수 정보를 입력해주세요.')
      return
    }
    const signupData = {
      nickname,
      phone,
      birthDate: `${birthDate.year}.${birthDate.month}.${birthDate.day}`,
      id: authData?.id ?? ''
    }
    const userData = await signupUser(
      signupData.nickname,
      signupData.phone,
      signupData.birthDate,
      signupData.id
    )

    const fetchData = {
      id: authData?.id ?? '',
      nickname: nickname ?? '',
      phone: phone ?? '',
      birthDate: `${birthDate.year}.${birthDate.month}.${birthDate.day}`,
      email: authData?.email ?? '',
      profileimage: authData?.profileimage ?? '',
      createdat: authData?.createdat ?? '',
      career: authData?.career ?? '',
      interest: authData?.interest ?? '',
      techstack: authData?.techstack ?? []
    }

    if (userData) {
      alertSuccess({
        title: '회원가입 완료',
        text: '회원가입이 완료되었습니다.',
        icon: 'success'
      })
      login(fetchData)
    }

    navigate('/', { replace: true })
  }

  return {
    birthDate,
    phone,
    setPhone,
    nickname,
    setNickname,
    handleBirthChange,
    handlePhoneChange,
    handleSignup
  }
}
