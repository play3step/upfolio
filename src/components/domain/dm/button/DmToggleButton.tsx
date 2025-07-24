import S from './DmToggleButton.module.css'
import dmIcon from '@/assets/icon/dm.svg'
import closeIcon from '@/assets/icon/delete.svg'
import { useState } from 'react'

export default function DmToggleButton() {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <button
      className={S['dm-buatton']}
      onClick={handleToggle}>
      <img
        src={isOpen ? closeIcon : dmIcon}
        alt="DM"
        className={S['dm-button-icon']}
      />
    </button>
  )
}
