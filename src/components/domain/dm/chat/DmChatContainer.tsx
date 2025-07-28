import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from './DmChatListItem'
import DmChatMessage from './DmChatMessage'
import type { Message, Thread } from '@/types/thread'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'

interface Props {
  isOpen: boolean
  selectedThreadId: string | null
  handleSelectChatRoom: (threadId: string) => void
  handleAddThreads: (otherUserId: string) => void
  threads: Thread[] | null
  messages: Message[] | null
  sendMessage: (message: string) => void
}

export default function DmChatContainer({
  isOpen,
  selectedThreadId,
  handleSelectChatRoom,
  handleAddThreads,
  threads,
  messages,
  sendMessage
}: Props) {
  const { authData } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  return (
    <div
      className={S['dm-chat-container']}
      style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className={S['dm-chat-container-left']}>
        {threads?.map(thread => (
          <DmChatListItem
            key={thread.id}
            id={thread.id}
            isSelected={selectedThreadId === thread.id}
            name={thread.name}
            lastMessage={thread.lastMessage ?? '내용이 없습니다.'}
            handleSelectChatRoom={handleSelectChatRoom}
          />
        ))}
        <button
          onClick={() =>
            handleAddThreads('b4c5d98b-1b22-4cad-a1b1-fa60e170fd99')
          }>
          채팅방생성
        </button>
      </div>
      <div className={S['dm-chat-container-right']}>
        <div className={S['dm-chat-conversation']}>
          {messages?.map(message => (
            <DmChatMessage
              key={message.id}
              message={message.message}
              isMine={message.senderid === authData?.id}
              name={message.name}
              profile={message.profile}
            />
          ))}
        </div>
        <div className={S['dm-chat-input']}>
          <textarea
            placeholder="채팅을 입력하세요."
            className={S['dm-chat-input-text']}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />

          <div
            className={S['dm-chat-input-button']}
            onClick={() => {
              sendMessage(message)
              setMessage('')
            }}>
            <img
              src={dmSendIcon}
              alt="dm-send-icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
