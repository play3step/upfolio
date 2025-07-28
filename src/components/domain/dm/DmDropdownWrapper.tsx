import DmChatContainer from './chat/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useEffect, useState } from 'react'
import { useThreads } from '@/hooks/dm/useThreads'
import { useMessage } from '@/hooks/dm/useMessage'

export default function DmDropdownWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const { threads, handleFetchThreads, handleAddThreads } = useThreads()
  const { messages, handleFetchMessages } = useMessage()

  useEffect(() => {
    handleFetchThreads()
  }, [isOpen])

  useEffect(() => {
    if (selectedThreadId) {
      handleFetchMessages(selectedThreadId)
    }
  }, [selectedThreadId])

  console.log(messages)

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
        handleAddThreads={handleAddThreads}
        threads={threads}
      />
      <DmToggleButton
        isOpen={isOpen}
        handleToggle={handleToggle}
      />
    </div>
  )
}
