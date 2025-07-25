import DmChatContainer from './chat/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useState } from 'react'

export default function DmDropdownWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelectChatRoom = (threadId: string) => {
    setSelectedThreadId(threadId)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 'var(--sp-4)'
      }}>
      <DmChatContainer
        isOpen={isOpen}
        selectedThreadId={selectedThreadId}
        handleSelectChatRoom={handleSelectChatRoom}
      />
      <DmToggleButton
        isOpen={isOpen}
        handleToggle={handleToggle}
      />
    </div>
  )
}
