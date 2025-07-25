import S from './DmChatListItem.module.css'

interface Props {
  id: string
  isSelected: boolean

  name: string
  lastMessage: string
  handleSelectChatRoom: (threadId: string) => void
}

export default function DmChatListItem({
  id,
  isSelected,
  name,
  lastMessage,
  handleSelectChatRoom
}: Props) {
  return (
    <div
      className={S['dm-chat-list-item']}
      style={{ backgroundColor: isSelected ? 'var(--primary)' : 'white' }}
      onClick={() => handleSelectChatRoom(id)}>
      <div className={S['dm-chat-list-item-left']}>
        <div className={S['dm-chat-list-item-left-profile']}></div>
      </div>
      <div
        className={S['dm-chat-list-item-right']}
        style={{
          color: isSelected ? 'white' : ''
        }}>
        <span className={S['name']}>{name}</span>
        <span className={S['last-message']}>{lastMessage}</span>
      </div>
    </div>
  )
}
