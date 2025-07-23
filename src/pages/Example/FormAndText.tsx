import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Header from '@/components/common/Header'

function FormAndText() {
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

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 'var(--fs-xxl)', marginBottom: 'var(--sp-4)' }}>
        ✅component
      </h1>

      <h2 style={h2Style}>1. 버튼</h2>

      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: 없음</li>
          <li>기본 type: button</li>
          <li>기본 버튼텍스트: 버튼</li>
        </ul>

        <Button></Button>
        <Button
          type="submit"
          onClick={() => console.log('hi')}
          line>
          라인 스타일
        </Button>
        <Button disabled>disabled</Button>
      </div>

      <h2 style={h2Style}>2. input</h2>

      <div style={divStyle}>
        <ul style={ulStyle}>
          <li>props 필수 속성: id, label</li>
        </ul>

        <Input
          id="exName"
          label="기본"
        />
        <Input
          id="exEmail"
          label="readOnly"
          value="읽기만 가능가능"
          readOnly
        />
        <Input
          id="exPass"
          type="password"
          label="에러메세지"
          error="에러메세지가 출력됩니다."
        />
      </div>

      <h2 style={h2Style}>4. Select</h2>
      <Select />

      <h2 style={h2Style}>3. Header</h2>
      <Header />
    </div>
  )
}
export default FormAndText
