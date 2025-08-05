import { useState, useEffect, useCallback } from 'react'
import {
  getCurrentUserId,
  fetchUserProfile,
  updateUserProfile,
  updateCommentProfileImage
} from '@/apis/mypage/profile.controller'
import { formatPhoneNumber } from '@/utils/format'
import { useSignup } from '@/hooks/auth/useSignup'
import type { UserProfile } from '@/types/mypage'
import { alertError, alertSuccess, alertWarning } from '@/utils/alertUtils'

export const useProfile = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const { phone, handlePhoneChange, setPhone } = useSignup()

  // 사용자 ID와 프로필 정보 가져오기
  const loadUserProfile = useCallback(async () => {
    try {
      setLoading(true)
      const id = await getCurrentUserId()
      if (!id) return

      setUserId(id)
      const profileData = await fetchUserProfile(id)

      if (profileData) {
        profileData.phone = formatPhoneNumber(profileData.phone)

        if (isEditing) {
          setPhone(profileData.phone || '')
        }
      }

      setProfile(profileData)
    } catch (error) {
      console.error('프로필 정보를 불러오는데 실패했습니다:', error)
    } finally {
      setLoading(false)
    }
  }, [isEditing, setPhone])

  // 초기 데이터 로드
  useEffect(() => {
    loadUserProfile()
  }, [loadUserProfile])

  // 프로필 필드 변경 핸들러
  const handleChange = (field: keyof UserProfile, value: string) => {
    let formattedValue = value

    if (field === 'birthDate') {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value)
      if (!isValidDate) {
        alertWarning({
          title: '유효하지 않은 입력',
          text: '유효하지 않은 날짜 형식입니다. yyyy-MM-dd 형식으로 입력해주세요.',
          confirmButtonText: '확인'
        })
        formattedValue = ''
      } else {
        const [year, month, day] = value.split('-')
        const validYear = year.length > 4 ? year.slice(0, 4) : year
        const validMonth =
          parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12 ? month : '01'
        const validDay =
          parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31 ? day : '01'
        formattedValue = `${validYear}-${validMonth}-${validDay}`
      }
    }

    setProfile(prev => (prev ? { ...prev, [field]: formattedValue } : null))
  }

  // 프로필 저장 핸들러
  const handleSave = async () => {
    if (!userId || !profile) return

    const formattedPhone = formatPhoneNumber(phone)
    const oldProfileImage = profile.profileimage
    const newProfileImage = profile.profileimage ?? undefined

    try {
      // 프로필 이미지가 변경된 경우 댓글 테이블도 업데이트
      if (oldProfileImage !== newProfileImage) {
        await updateCommentProfileImage(
          userId,
          oldProfileImage,
          newProfileImage
        )
      }

      // 사용자 프로필 업데이트
      const updatedProfile = await updateUserProfile(userId, {
        nickname: profile.nickname,
        phone: formattedPhone,
        birthDate: profile.birthDate,
        profileimage: newProfileImage
      })

      // 상태 업데이트
      setProfile(updatedProfile)
      setIsEditing(false)

      alertSuccess({
        title: '프로필 수정 완료',
        text: '프로필 정보가 수정되었습니다.'
      })
    } catch (err) {
      console.error('예상치 못한 오류:', err)
      alertError({
        title: '프로필 저장 실패',
        text: '다시 시도해주세요.'
      })
    }
  }

  return {
    profile,
    isEditing,
    setIsEditing,
    phone,
    handlePhoneChange,
    loading,
    handleChange,
    handleSave,
    userId
  }
}
