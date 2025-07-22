import type { InputHTMLAttributes } from 'react'
import S from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  id: string;
  label: string;
  hideLabel?: boolean;
  readOnly? : boolean;
  error?: string;
}

function Input({id, label, hideLabel, type = 'text', readOnly, error, ...props}:Props) {
  return (
    <div className={`${S['input-box']} ${ error ? S['input-box'] : ''}`}>
      <label htmlFor={id} className={hideLabel ? 'a11y-hidden' : ''}>{label}</label>
      <input
        id={id}
        type={type}
        readOnly={readOnly}
        {...props}
      />

      {error && <span id={`${id}Err`} className={S['input-box__err']}>
        {error}
      </span>}
    </div>
  )
}
export default Input