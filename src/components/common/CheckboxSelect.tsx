import { useState } from 'react'
import S from './CheckboxSelect.module.css'

interface Props {
  hideLabel?: boolean
  error?: string
}

const TECHSTACK_LIST = [
  'React',
  'Html5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'figma'
]

function CheckboxSelect({ hideLabel, error }: Props) {
  const [techStack, setTechStack] = useState<string[]>([])

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleTech = (stack: string) => {
    if (techStack.includes(stack)) {
      setTechStack(techStack.filter(g => g !== stack))
    } else {
      setTechStack([...techStack, stack])
    }
  }

  return (
    <fieldset className={`${S['CS-wrap']} ${error ? S['CS-wrap--err'] : ''}`}>
      <legend className={hideLabel ? 'a11y-hidden' : ''}>기술스택</legend>
      <div className={S['CS__selectedList']}>
        {techStack.map(stack => (
          <div
            key={stack}
            className={S['CS__selecteditem']}>
            <span>{stack}</span>
            <button onClick={() => toggleTech(stack)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          className={`${S['CS__accordionButton']} ${isExpanded ? S['rotated'] : ''}`}>
          <span className="a11y-hidden">
            {isExpanded ? '스택 목록 접기' : '스택 목록 열기'}
          </span>
        </button>
      </div>

      <ul
        className={`${S['CS__checkList']} ${isExpanded ? S['expanded'] : ''}`}>
        {TECHSTACK_LIST.map(stack => (
          <li
            key={stack}
            className={`${techStack.includes(stack) ? `${S['checked']}` : ''}`}>
            <label>
              <input
                type="checkbox"
                name="stacks"
                checked={techStack.includes(stack)}
                onChange={() => toggleTech(stack)}
                className="a11y-hidden"
              />
              <span className={S.CS__checkbox}></span>
              <span>{stack}</span>
            </label>
          </li>
        ))}
      </ul>

      {error && <span className={'err-msg'}>{error}</span>}
    </fieldset>
  )
}
export default CheckboxSelect
