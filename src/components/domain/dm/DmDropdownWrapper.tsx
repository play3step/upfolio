import DmChatContainer from './chat/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useEffect, useState } from 'react'
import { useThreads } from '@/hooks/dm/useThreads'
import { useMessage } from '@/hooks/dm/useMessage'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { usePollingMessages } from '@/hooks/dm/usePollingMessages'

export default function DmDropdownWrapper() {
  const { authData } = useContext(AuthContext)

  const { handleFetchThreads, handleAddThreads } = useThreads()
  const { handleFetchMessages, handleAddMessages } = useMessage()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const { threads, messages } = usePollingMessages({
    threadId: selectedThreadId ?? '',
    isOpen
  })

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
    if (message.trim() === '') {
      alert('메시지를 입력해주세요.')
      return
    }

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
