import DmChatContainer from './chat/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useEffect, useState } from 'react'
import { useThreads } from '@/hooks/dm/useThreads'
import { useMessage } from '@/hooks/dm/useMessage'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export default function DmDropdownWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const { authData } = useContext(AuthContext)

  const { threads, handleFetchThreads, handleAddThreads } = useThreads()
  const { messages, handleFetchMessages, handleAddMessages } = useMessage()

  useEffect(() => {
    handleFetchThreads()
  }, [isOpen])

  useEffect(() => {
    if (selectedThreadId) {
      handleFetchMessages(selectedThreadId)
    }
  }, [selectedThreadId])

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelectChatRoom = (threadId: string) => {
    setSelectedThreadId(threadId)
  }

  const sendMessage = async (message: string) => {
    if (!selectedThreadId || !authData?.id) {
      return
    }
    handleAddMessages(selectedThreadId, message, authData?.id, new Date())
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
        messages={messages}
        sendMessage={sendMessage}
      />
      <DmToggleButton
        isOpen={isOpen}
        handleToggle={handleToggle}
      />
    </div>
  )
}
