import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from './DmChatListItem'
import DmChatMessage from './DmChatMessage'
import type { Thread } from '@/types/thread'

interface Props {
  isOpen: boolean
  selectedThreadId: string | null
  handleSelectChatRoom: (threadId: string) => void
  handleAddThreads: (otherUserId: string) => void
  threads: Thread[] | null
}

export default function DmChatContainer({
  isOpen,
  selectedThreadId,
  handleSelectChatRoom,
  handleAddThreads,
  threads
}: Props) {
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
          <DmChatMessage
            message="에헤이 귀찮아"
            isMine={true}
          />
          <DmChatMessage
            message="그렇게 하는거 아닌데 뭐 하는거야"
            isMine={false}
          />
          <DmChatMessage
            message="에헤이 귀찮아"
            isMine={true}
          />
          <DmChatMessage
            message="그렇게 하는거 아닌데 뭐 하는거야"
            isMine={false}
          />
          <DmChatMessage
            message="에헤이 귀찮아"
            isMine={true}
          />
          <DmChatMessage
            message="그렇게 하는거 아닌데 뭐 하는거야"
            isMine={false}
          />
          <DmChatMessage
            message="에헤이 귀찮아"
            isMine={true}
          />
          <DmChatMessage
            message="그렇게 하는거 아닌데 뭐 하는거야"
            isMine={false}
          />
        </div>
        <div className={S['dm-chat-input']}>
          <textarea
            placeholder="채팅을 입력하세요."
            className={S['dm-chat-input-text']}
          />

          <div className={S['dm-chat-input-button']}>
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
