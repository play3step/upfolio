import { signupUser } from '@/apis/user/signup.controller'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { AuthContext } from '@/context/auth/AuthContext'
import { formatPhoneNumber } from '@/utils/format'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alertSuccess, alertWarning } from '@/utils/alertUtils'

export const useSignup = () => {
  const { authData } = useContext(AuthContext)

  const [nickname, setNickname] = useState(authData?.nickname ?? '')
  const [birthDate, setBirthDate] = useState({
    year: '',
    month: '',
    day: ''
  })
  const [phone, setPhone] = useState('')
  const { getSession } = useAuthLogin()
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
      alertWarning({ text: '모든 필수 정보를 입력해주세요.' })
      return
    }
    const signupData = {
      nickname,
      phone,
      birthDate: `${birthDate.year}.${birthDate.month}.${birthDate.day}`,
      id: authData?.id ?? ''
    }
    await signupUser(
      signupData.nickname,
      signupData.phone,
      signupData.birthDate,
      signupData.id
    )
    await getSession()
    alertSuccess({
      title: '회원가입 완료',
      text: 'Upfolio의 다양한 기능을 이용해보세요.'
    })
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
