import { signupUser } from '@/apis/user/signup.controller'
import { AuthContext } from '@/context/AuthContext'
import { formatPhoneNumber } from '@/utils/format'
import { useContext, useState } from 'react'

export const useSignup = () => {
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: ''
  })
  const [phone, setPhone] = useState('')
  const { authData } = useContext(AuthContext)

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
      phone,
      birthDate: `${birthDate.year}.${birthDate.month}.${birthDate.day}`,
      id: authData?.id ?? ''
    }
    await signupUser(signupData.phone, signupData.birthDate, signupData.id)
  }

  return {
    birthDate,
    phone,
    handleBirthChange,
    handlePhoneChange,
    handleSignup
  }
}
