import type { TextareaHTMLAttributes } from 'react'
import S from './Textarea.module.css'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  className?: string
  hideLabel?: boolean
  name?: string
  readOnly?: boolean
  error?: string
}

function Textarea({
  id,
  label,
  className = '',
  hideLabel,
  name,
  readOnly,
  error,
  ...props
}: Props) {
  return (
    <div
      className={`${S['textarea-wrap']} ${error ? S['textarea-wrap--err'] : ''} ${className}`}>
      <label
        htmlFor={id}
        className={hideLabel ? 'a11y-hidden' : ''}>
        {label}
      </label>
      <textarea
        id={id}
        name={name ?? id}
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
export default Textarea
