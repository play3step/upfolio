import DmChatContainer from './chat/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useState } from 'react'

export default function DmDropdownWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 'var(--sp-4)'
      }}>
      <DmChatContainer isOpen={isOpen} />
      <DmToggleButton
        isOpen={isOpen}
        handleToggle={handleToggle}
      />
    </div>
  )
}
