import Button from '@/components/common/Button'
import CheckboxSelect from '@/components/common/CheckboxSelect'

export default function Profile() {
  const handleCheckboxChange = (selectedOptions: string[]) => {
    console.log('선택된 옵션:', selectedOptions)
  }
  return (
    <div>
      <h1>내프로필</h1>
      <div>
        <img
          src="@/assets/logo.svg"
          alt="supabase에서 가져올 이미지"
        />
        <p>
          안녕하세요,User님. <br />
          오늘도 파이팅하세요!
        </p>
        <Button>프로필 수정</Button>
        <hr />
        <div>
          <CheckboxSelect
            items={[
              'React',
              'Html5',
              'CSS3',
              'JavaScript',
              'TypeScript',
              'figma'
            ]}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  )
}
