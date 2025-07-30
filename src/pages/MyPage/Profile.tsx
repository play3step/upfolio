import Button from '@/components/common/Button'
import ImageUploader from '@/components/common/ImageUploader'
import { useEffect, useState } from 'react'
import S from './Profile.module.css'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/formatDate'
import Input from '@/components/common/Input'
import defaultProfile from '../../assets/images/default-profile.png'

interface UserProfile {
  id: string
  nickname: string
  phone: string
  birthDate: string
  email: string
  profileimage: string
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
        .select('id, email, nickname, phone, birthDate, profileimage')
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
        profileimage: data?.profileimage || null
      })
      .eq('id', data?.id)
    setIsEditing(false)

    alert('프로필이 저장되었습니다.')
  }

  const handleChange = (field: keyof UserProfile, value: string) => {
    setData(prev => (prev ? { ...prev, [field]: value } : null))
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
            <hr />
            {isEditing && (
              <ProfileButton onClick={handleSave}>저장</ProfileButton>
            )}
          </div>
        </div>
        <div className={S.profile__imageSection}>
          <div className={S.profile__image}>
            {isEditing ? (
              <ImageUploader
                id="profile-image"
                value={data?.profileimage || ''}
                onChange={url => handleChange('profileimage', url)}
              />
            ) : (
              <img
                src={data?.profileimage || defaultProfile}
                alt="profile"
                className={S.profile__image}
              />
            )}
          </div>

          <p className={S.profile__greeting}>
            안녕하세요, <strong>{data?.nickname}</strong>님 <br />
            오늘도 파이팅하세요!
          </p>
        </div>
        <hr className={S.profile__divider} />
        <div className={S.profile__details}>
          <p>
            <strong>이메일 : </strong> {data?.email || '정보 없음'}
          </p>
          <p>
            {!isEditing && <strong>닉네임 : </strong>}
            {isEditing ? (
              <Input
                id="nickname"
                label="닉네임"
                value={data?.nickname || ''}
                readOnly={!isEditing}
                onChange={e => handleChange('nickname', e.target.value)}
                className={S.profile__input}
              />
            ) : (
              data?.nickname || '정보 없음'
            )}
          </p>
          <p>
            {!isEditing && <strong>전화번호 : </strong>}
            {isEditing ? (
              <Input
                id="phone"
                label="전화번호"
                value={data?.phone || ''}
                readOnly={!isEditing}
                onChange={e => handleChange('phone', e.target.value)}
                className={S.profile__input}
              />
            ) : (
              data?.phone || '정보 없음'
            )}
          </p>
          <p>
            {!isEditing && <strong>생년월일 : </strong>}
            {isEditing ? (
              <Input
                id="birthDate"
                label="생년월일"
                type="date"
                value={data?.birthDate || ''}
                readOnly={!isEditing}
                onChange={e => handleChange('birthDate', e.target.value)}
                className={S.profile__input}
              />
            ) : (
              formatDate(data?.birthDate ?? '') || '정보 없음'
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
