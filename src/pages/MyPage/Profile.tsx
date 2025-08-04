import Button from '@/components/common/Button'
import ImageUploader from '@/components/common/ImageUploader'
import { useEffect, useState } from 'react'
import S from './Profile.module.css'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/format'
import Input from '@/components/common/Input'
import defaultProfile from '../../assets/images/default-profile.png'
import { useSignup } from '@/hooks/auth/useSignup'
import { formatPhoneNumber } from '@/utils/format'
import { alertError, alertSuccess } from '@/utils/alertUtils'
import type { UserProfile } from '@/types/mypage'

export default function Profile() {
  const [data, setData] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { phone, handlePhoneChange, setPhone } = useSignup()

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

      if (profile) {
        profile.phone = formatPhoneNumber(profile.phone)
      }

      if (isEditing && data?.phone) {
        setPhone(data.phone)
      }

      setData(profile)
    }
    fetchData()
  }, [isEditing, data?.phone, setPhone])

  const handleSave = async () => {
    const formattedPhone = formatPhoneNumber(phone)
    const oldProfileImage = data?.profileimage
    const newProfileImage = data?.profileimage || null

    try {
      // 1. 댓글 테이블의 profileimage 값 업데이트
      if (oldProfileImage !== newProfileImage) {
        await supabase
          .from('Comment')
          .update({ profileimage: newProfileImage })
          .eq('profileimage', oldProfileImage)
          .eq('userid', data?.id)
      }

      // 2. 사용자 프로필 업데이트
      await supabase
        .from('User')
        .update({
          nickname: data?.nickname,
          phone: formattedPhone,
          birthDate: data?.birthDate,
          profileimage: newProfileImage
        })
        .eq('id', data?.id)

      // 3. 업데이트된 데이터 다시 가져오기
      const { data: updatedUser } = await supabase
        .from('User')
        .select('id, email, nickname, phone, birthDate, profileimage')
        .eq('id', data?.id)
        .single()

      // 상태 업데이트
      setData(updatedUser)
      setIsEditing(false)
      alertSuccess({
        title: '프로필 수정 완료',
        text: '프로필 정보 수정되었습니다.'
      })
    } catch (err) {
      console.error('예상치 못한 오류:', err)
      alertError({
        title: '프로필 저장 실패',
        text: '프로필 정보를 저장하는 데 실패했습니다. 다시 시도해주세요.'
      })
    }
  }

  const handleChange = (field: keyof UserProfile, value: string) => {
    setData(prev => (prev ? { ...prev, [field]: value } : null))
  }

  function ProfileButton({
    children,
    onClick,
    line = false
  }: {
    children: React.ReactNode
    onClick: () => void
    line?: boolean
  }) {
    return (
      <Button
        onClick={onClick}
        className={S.profile__button}
        line={line}>
        {children}
      </Button>
    )
  }

  const imageSrc =
    data?.profileimage && data.profileimage.trim().length > 0
      ? data.profileimage
      : defaultProfile

  return (
    <div className={S.profile}>
      <div className={S.profile__content}>
        <div className={S.profile__title}>
          <h1>내 프로필</h1>
          <div className={S.profile__btnWrap}>
            <ProfileButton
              onClick={() => setIsEditing(prev => !prev)}
              line={isEditing}>
              {isEditing ? '취소' : '프로필 수정'}
            </ProfileButton>
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
                value={imageSrc}
                onChange={url => {
                  // console.log('Image URL:', url) // URL이 제대로 전달되는지 확인
                  handleChange('profileimage', url)
                }}
              />
            ) : (
              <img
                src={imageSrc || defaultProfile}
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
          <div>
            <strong>이메일 : </strong> {data?.email || '정보 없음'}
          </div>
          <div>
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
          </div>
          <div>
            {!isEditing && <strong>전화번호 : </strong>}
            {isEditing ? (
              <Input
                id="exId03"
                label="전화번호"
                placeholder="수정할 전화번호를 입력해 주세요"
                value={phone}
                onChange={handlePhoneChange}
                className={S.profile__input}
                maxLength={13}
              />
            ) : (
              data?.phone || '정보 없음'
            )}
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  )
}
