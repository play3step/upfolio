import Button from '@/components/common/Button'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import ImageUploader from '@/components/common/ImageUploader'
import { useState } from 'react'
import S from './Profile.module.css'

export default function Profile() {
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])

  const handleCheckboxChange = (selectedItems: string[]) => {
    setSelectedTechStack(selectedItems) // 선택된 값을 상태로 저장
  }

  return (
    <div className={S.profile}>
      <div className={S.profile__content}>
        <div className={S.profile__title}>
          <h1>내 프로필</h1>
          <div className={S.profile__btnWrap}>
            <Button>프로필 수정</Button>
          </div>
        </div>
        <div className={S.profile__imageSection}>
          <ImageUploader id="profile-image" />
          <p className={S.profile__greeting}>
            안녕하세요, <strong>User</strong>님 <br />
            오늘도 파이팅하세요!
          </p>
        </div>

        <hr className={S.profile__divider} />

        <div className={S.profile__checkbox}>
          <p>{selectedTechStack.join(' | ') || '선택된 항목이 없습니다.'}</p>
          <CheckboxSelect onChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  )
}
