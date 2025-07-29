import Button from '@/components/common/Button'
import ImageUploader from '@/components/common/ImageUploader'
import { useEffect, useState } from 'react'
import S from './Profile.module.css'
import supabase from '@/lib/supabaseClient'

interface UserProfile {
  nickname: string
  phone: string
  birthDate: string
  email: string
  profileimage: string
}

interface ProfileImageUploaderProps {
  imageUrl?: string
  editable: boolean
  onImageUpload: (url: string) => void
}

export default function Profile() {
  const [data, setData] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('사용자 인증 정보가 없습니다.')
        return
      }
      const { data: profile } = await supabase
        .from('User')
        .select('email, nickname, phone, birthDate, profileimage')
        .eq('id', user.id)
        .single()

      setData(profile)
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    await supabase
      .from('User')
      .update({
        nickname: data?.nickname,
        phone: data?.phone,
        birthDate: data?.birthDate,
        profileimage: data?.profileimage
      })
      .eq('id', data?.id)
    setIsEditing(false)

    alert('프로필이 저장되었습니다.')
  }

  function ProfileButton({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) {
    return (
      <Button
        onClick={onClick}
        className={S.profile__button}>
        {children}
      </Button>
    )
  }

  return (
    <div className={S.profile}>
      <div className={S.profile__content}>
        <div className={S.profile__title}>
          <h1>내 프로필</h1>
          <div className={S.profile__btnWrap}>
            <ProfileButton onClick={() => setIsEditing(prev => !prev)}>
              {isEditing ? '취소' : '프로필 수정'}
            </ProfileButton>
          </div>
        </div>
        <div className={S.profile__imageSection}>
          <ImageUploader id="profile-image" />
          <p className={S.profile__greeting}>
            안녕하세요, <strong>{data?.nickname}</strong>님 <br />
            오늘도 파이팅하세요!
          </p>
        </div>
        <hr className={S.profile__divider} />
        <div className={S.profile__details}>
          <p>
            <strong>전화번호:</strong> {data?.phone || '정보 없음'}
          </p>
          <p>
            <strong>생년월일:</strong> {data?.birthDate || '정보 없음'}
          </p>
          <p>
            <strong>이메일:</strong> {data?.email || '정보 없음'}
          </p>
        </div>
      </div>
    </div>
  )
}
