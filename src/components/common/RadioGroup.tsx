import type React from 'react'
import S from './RadioGroup.module.css'

interface Option {
  label: string
  value: string
}

interface Props {
  label: string
  hideLabel?: boolean
  options: Option[]
  name: string
  checked: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
}

function RadioGroup({
  label,
  hideLabel,
  options,
  name,
  checked,
  error,
  className = '',
  onChange
}: Props) {
  return (
    <fieldset
      className={`${S['radio-group']} ${error ? S['radio-group--err'] : ''} ${className}`}>
      <legend className={hideLabel ? 'a11y-hidden' : ''}>{label}</legend>
      <ul>
        {options.map(option => (
          <li key={option.value}>
            <label>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked === option.value}
                onChange={onChange}
                className="a11y-hidden"
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {error && <span className={'err-msg'}>{error}</span>}
    </fieldset>
  )
}
export default RadioGroup
