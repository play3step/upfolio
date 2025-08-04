import DmChatContainer from './message/DmChatContainer'
import DmToggleButton from './button/DmToggleButton'
import { useEffect, useState } from 'react'
import { useThreads } from '@/hooks/dm/useThreads'
import { useMessage } from '@/hooks/dm/useMessage'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth/AuthContext'
import { usePollingMessages } from '@/hooks/dm/usePollingMessages'
import { DmContext } from '@/context/dm/DmContext'
import { useIsMobile } from '@/hooks/header/useIsMobile'

export default function DmDropdownWrapper() {
  const { dm } = useContext(DmContext)
  const { authData } = useContext(AuthContext)

  const { handleFetchThreads } = useThreads()
  const { handleFetchMessages, handleAddMessages } = useMessage()

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)

  const isMobile = useIsMobile()

  const { threads, messages } = usePollingMessages({
    threadId: selectedThreadId ?? '',
    isOpen: dm
  })

  useEffect(() => {
    handleFetchThreads()
  }, [dm])

  useEffect(() => {
    if (selectedThreadId) {
      handleFetchMessages(selectedThreadId)
    }
  }, [selectedThreadId])

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

    const selectedThread = threads.find(
      thread => thread.id === selectedThreadId
    )
    if (!selectedThread) return

    handleAddMessages(
      selectedThreadId,
      message,
      authData.id,
      selectedThread.receiverid,
      new Date()
    )
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
        isOpen={dm}
        selectedThreadId={selectedThreadId}
        handleSelectChatRoom={handleSelectChatRoom}
        threads={threads}
        messages={messages}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
      {!isMobile && <DmToggleButton />}
    </div>
  )
}
