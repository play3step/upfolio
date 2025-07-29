import { formatPhoneNumber } from '@/utils/format'
import { useState } from 'react'

export const useSignup = () => {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedValue = formatPhoneNumber(value)
    if (formattedValue.length <= 13) {
      setPhone(formattedValue)
    }
  }

  return { birthDate, phone, handleBirthChange, handlePhoneChange }
}
