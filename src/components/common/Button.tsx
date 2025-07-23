import type { ReactNode } from 'react'
import S from './Button.module.css'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  line?: boolean // 버튼스타일
  children?: ReactNode // 버튼 안 텍스트
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({
  type = 'button',
  line,
  disabled = false,
  children,
  onClick
}: Props) {
  return (
    <>
      <button
        type={type}
        className={`${S.btn} ${line ? ` ${S['btn--line']}` : ''}`}
        disabled={disabled}
        onClick={onClick}>
        <span className={S.btn__txt}>{children ? `${children}` : '버튼'}</span>
      </button>
    </>
  )
}
export default Button
