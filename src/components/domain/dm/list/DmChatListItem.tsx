import S from './DmChatListItem.module.css'

interface Props {
  id: string
  isSelected: boolean

  name: string
  profile: string
  lastMessage: string
  handleSelectChatRoom: (threadId: string) => void
}

export default function DmChatListItem({
  id,
  isSelected,
  name,
  profile,
  lastMessage,
  handleSelectChatRoom
}: Props) {
  return (
    <div
      className={S['dm-chat-list-item']}
      style={{ backgroundColor: isSelected ? 'var(--primary)' : 'white' }}
      onClick={() => handleSelectChatRoom(id)}>
      <div className={S['dm-chat-list-item-left']}>
        <img
          className={S['dm-chat-list-item-left-profile']}
          src={profile}
          alt={name}
        />
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
