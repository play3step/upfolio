import type { ButtonHTMLAttributes, ReactNode } from 'react'
import S from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  line?: boolean // 버튼 라인 스타일
  children?: ReactNode // 버튼 안 텍스트
}

function Button({
  type = 'button',
  line,
  disabled = false,
  children,
  className = '',
  ...props
}: Props) {
  return (
    <>
      <button
        type={type}
        className={`${S.btn} ${line ? ` ${S['btn--line']}` : ''} ${className}`}
        disabled={disabled}
        {...props}>
        <span className={S.btn__txt}>{children ? `${children}` : '버튼'}</span>
      </button>
    </>
  )
}
export default Button
