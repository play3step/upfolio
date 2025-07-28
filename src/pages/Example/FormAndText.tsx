import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Textarea from '@/components/common/Textarea'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import RadioGroup from '@/components/common/RadioGroup'
import { useState } from 'react'
import ImageUploader from '@/components/common/ImageUploader'

function FormAndText() {
  /* --- component 스타일 --- */
  const h2Style: React.CSSProperties = {
    fontSize: 'var(--fs-xl)',
    marginBottom: 'var(--sp-4)'
  }

  const divStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
    marginBottom: 'var(--sp-8)'
  }

  const ulStyle: React.CSSProperties = {
    paddingLeft: '2rem',
    listStyle: 'disc'
  }

  /* --- 라디오 그룹 상태 및 옵션 --- */
  const [interest, setInterest] = useState('')
  const INTEREST_SELECT = [
    { label: '프론트엔드', value: 'FE' },
    { label: '백엔드', value: 'BE' },
    { label: '풀스택', value: 'FullStack' },
    { label: '모바일', value: 'Mobile' },
    { label: '임베디드', value: 'Embedded' },
    { label: 'UI/UX 디자인', value: 'UIUX' },
    { label: '그래픽 디자인', value: 'Graphic' },
    { label: '모션 디자인', value: 'Motion' },
    { label: '일러스트', value: 'Illustration' }
  ]

  const [selectedStack, setSelectedStack] = useState<string[]>([])

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 'var(--fs-xxl)', marginBottom: 'var(--sp-4)' }}>
        ✅component
      </h1>

      <h2 style={h2Style}>1. 버튼</h2>

      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: 없음</li>
          <li>버튼 기본 type: button</li>
          <li>기본 버튼텍스트: 버튼</li>
        </ul>

        <Button />
        <Button
          type="submit"
          onClick={() => console.log('hi')}
          onMouseEnter={() => console.log('마우스 올림')}
          line>
          라인 스타일
        </Button>
        <Button disabled>disabled</Button>

        {/* 버튼 그룹형 */}
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Button line />
          <Button />
        </div>
      </div>

      <h2 style={h2Style}>2. input</h2>

      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: id, label</li>
          <li>input 기본 타입: text</li>
          <li>읽기전용: readOnly</li>
          <li>레이블 숨기고 싶을때: hideLabel</li>
          <li>에러: error=""</li>
        </ul>

        <Input
          id="exName"
          label="기본"
        />
        <Input
          id="exName2"
          label="레이블숨기기"
          hideLabel
        />
        <Input
          id="exName3"
          label="readOnly"
          value="읽기만 가능가능"
          readOnly
        />
        <Input
          id="exName4"
          label="에러메세지"
          error="에러메세지가 출력됩니다."
        />
      </div>

      <h2 style={h2Style}>3. Textarea</h2>
      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>input이랑 같음</li>
        </ul>

        <Textarea
          id="exText"
          label="기본"
        />
      </div>

      <h2 style={h2Style}>4. CheckboxSelect</h2>
      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>레이블 숨기고 싶을때: hideLabel</li>
          <li>에러: error=""</li>
        </ul>
        <CheckboxSelect
          value={selectedStack}
          onChange={setSelectedStack}
        />
      </div>

      <h2 style={h2Style}>5. Radio</h2>
      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: label, name, options, checked, onChange</li>
          <li>라디오 그룹 상태 및 옵션 지정 해줘야함(상단 확인)</li>
          <li>레이블 숨기고 싶을때: hideLabel</li>
          <li>에러: error=""</li>
        </ul>

        <RadioGroup
          label="지원분야"
          name="fieldOfSupport"
          options={INTEREST_SELECT}
          checked={interest}
          onChange={e => setInterest(e.target.value)}
        />
      </div>

      <h2 style={h2Style}>6. ImageUploader</h2>

      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: id</li>
          <li>이미지 등록 안할 시 기본이미지 있음</li>
        </ul>

        <ImageUploader id="exImageUploader" />
      </div>
    </div>
  )
}
export default FormAndText
