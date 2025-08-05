import ImageUploader from '@/components/common/ImageUploader'
import S from './Profile.module.css'
import { formatDate } from '@/utils/format'
import Input from '@/components/common/Input'
import defaultProfile from '@/assets/images/default-profile.png'
import ProfileButton from '@/components/common/ProfileButton'
import { useProfile } from '@/hooks/mypage/profile/useProfile'

export default function Profile() {
  const {
    profile,
    isEditing,
    setIsEditing,
    phone,
    handlePhoneChange,
    loading,
    handleChange,
    handleSave
  } = useProfile()

  if (loading) return <div className={S.loading}>로딩 중...</div>

  const imageSrc = (() => {
    // 프로필 이미지가 없거나 빈 문자열인 경우
    if (!profile?.profileimage || profile.profileimage.trim() === '') {
      return defaultProfile
    }

    // 유효한 URL인지 확인
    try {
      new URL(profile.profileimage)
      return profile.profileimage
    } catch {
      // 유효하지 않은 URL인 경우 기본 이미지 반환
      return defaultProfile
    }
  })()

  return (
    <div className={S.profile}>
      <div className={S.profile__content}>
        <div className={S.profile__title}>
          <h1>내 프로필</h1>
          <div className={S.profile__btnWrap}>
            <ProfileButton
              onClick={() => setIsEditing((prev: boolean) => !prev)}
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
                onChange={url => handleChange('profileimage', url)}
              />
            ) : (
              <img
                src={imageSrc}
                alt="profile"
                className={S.profile__image}
              />
            )}
          </div>

          <p className={S.profile__greeting}>
            안녕하세요, <strong>{profile?.nickname}</strong>님 <br />
            오늘도 파이팅하세요!
          </p>
        </div>
        <hr className={S.profile__divider} />
        <div className={S.profile__details}>
          <div>
            <strong>이메일 : </strong> {profile?.email || '정보 없음'}
          </div>
          <div>
            {!isEditing && <strong>닉네임 : </strong>}
            {isEditing ? (
              <Input
                id="nickname"
                label="닉네임"
                value={profile?.nickname || ''}
                readOnly={!isEditing}
                onChange={e => handleChange('nickname', e.target.value)}
                className={S.profile__input}
              />
            ) : (
              profile?.nickname || '정보 없음'
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
              profile?.phone || '정보 없음'
            )}
          </div>
          <div>
            {!isEditing && <strong>생년월일 : </strong>}
            {isEditing ? (
              <Input
                id="birthDate"
                label="생년월일"
                type="date"
                value={
                  profile?.birthDate &&
                  /^\d{4}-\d{2}-\d{2}$/.test(profile.birthDate)
                    ? profile.birthDate
                    : ''
                }
                readOnly={!isEditing}
                onChange={e => handleChange('birthDate', e.target.value)}
                className={S.profile__input}
              />
            ) : (
              formatDate(profile?.birthDate ?? '') || '정보 없음'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
