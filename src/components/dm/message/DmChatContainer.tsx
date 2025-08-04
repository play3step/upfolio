import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from '../list/DmChatListItem'
import DmChatMessage from './DmChatMessage'
import DmMobileHeader from './DmMobileHeader'
import type { Message, Thread } from '@/types/thread'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '@/context/auth/AuthContext'

interface Props {
  isOpen: boolean
  selectedThreadId: string | null
  handleSelectChatRoom: (threadId: string) => void
  threads: Thread[] | null
  messages: Message[] | null
  sendMessage: (message: string) => void
}

export default function DmChatContainer({
  isOpen,
  selectedThreadId,
  handleSelectChatRoom,

  threads,
  messages,
  sendMessage
}: Props) {
  const { authData } = useContext(AuthContext)
  const [message, setMessage] = useState('')
  const messageRef = useRef<HTMLDivElement | null>(null)

  // 메시지가 추가되거나 채팅방이 변경될 때 스크롤 내리기
  useEffect(() => {
    const message = messageRef.current
    if (!message) return
    setTimeout(() => message.scrollTo(0, message.scrollHeight))
  }, [messages, selectedThreadId])

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
            profile={thread.profile}
            lastMessage={thread.lastMessage ?? '내용이 없습니다.'}
            handleSelectChatRoom={handleSelectChatRoom}
          />
        ))}
      </div>
      <div className={S['dm-chat-container-right']}>
        {window.innerWidth <= 640 && (
          <DmMobileHeader
            onBackClick={() => handleSelectChatRoom('')}
            username={
              threads?.find(thread => thread.id === selectedThreadId)?.name ||
              ''
            }
            profileImage={
              threads?.find(thread => thread.id === selectedThreadId)
                ?.profile || ''
            }
          />
        )}
        <div
          className={S['dm-chat-conversation']}
          ref={messageRef}>
          {messages?.map(message => (
            <DmChatMessage
              key={message.id}
              message={message.message}
              isMine={message.senderid === authData?.id}
              name={
                threads?.find(thread => thread.id === message.threadid)?.name ??
                ''
              }
              profile={
                threads?.find(thread => thread.id === message.threadid)
                  ?.profile ?? ''
              }
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
