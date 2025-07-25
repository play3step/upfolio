import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from './DmChatListItem'
import DmChatMessage from './DmChatMessage'
import { useThreads } from '@/hooks/dm/useThreads'

interface Props {
  isOpen: boolean
  selectedThreadId: string | null
  handleSelectChatRoom: (threadId: string) => void
}

const threadList = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hello, how are you?'
  },
  {
    id: '2',
    name: 'Jane Doe',
    lastMessage: 'I am fine, thank you.'
  },
  {
    id: '3',
    name: 'John Doe',
    lastMessage: 'Hello, how are you?'
  }
]

export default function DmChatContainer({
  isOpen,
  selectedThreadId,
  handleSelectChatRoom
}: Props) {
  const { threads, handleAddThreads } = useThreads()
  console.log(threads)
  return (
    <div
      className={S['dm-chat-container']}
      style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className={S['dm-chat-container-left']}>
        {threadList.map(thread => (
          <DmChatListItem
            key={thread.id}
            id={thread.id}
            isSelected={selectedThreadId === thread.id}
            name={thread.name}
            lastMessage={thread.lastMessage}
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
