import type { InputHTMLAttributes } from 'react'
import S from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  className?: string
  hideLabel?: boolean
  name?: string
  readOnly?: boolean
  error?: string
}

function Input({
  id,
  label,
  hideLabel,
  name,
  type = 'text',
  readOnly,
  error,
  className = '',
  ...props
}: Props) {
  return (
    <div
      className={`${S['input-wrap']} ${error ? S['input-wrap--err'] : ''} ${className}`}>
      <label
        htmlFor={id}
        className={hideLabel ? 'a11y-hidden' : ''}>
        {label}
      </label>
      <input
        id={id}
        name={name ?? id}
        type={type}
        readOnly={readOnly}
        {...props}
      />

      {error && (
        <span
          id={`${id}Err`}
          className={'err-msg'}>
          {error}
        </span>
      )}
    </div>
  )
}
export default Input
