import Button from '@/components/common/Button'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import ImageUploader from '@/components/common/ImageUploader'
import { useState } from 'react'

export default function Profile() {
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([])

  const handleCheckboxChange = (selectedItems: string[]) => {
    setSelectedTechStack(selectedItems) // 선택된 값을 상태로 저장
  }

  return (
    <div>
      <h1>내프로필</h1>
      <div>
        <ImageUploader id="profile-image" />
        <p>
          안녕하세요,User님. <br />
          오늘도 파이팅하세요!
        </p>
        <Button>프로필 수정</Button>
        <hr />
        <div>
          <p>{selectedTechStack.join(' | ') || '선택된 항목이 없습니다.'}</p>
          <CheckboxSelect onChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  )
}
