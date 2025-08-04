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
      className={`${S['dm-chat-list-item']} ${isSelected ? S.selected : ''}`}
      onClick={() => handleSelectChatRoom(id)}>
      <div className={S['dm-chat-list-item-left']}>
        <img
          className={S['dm-chat-list-item-left-profile']}
          src={profile}
          alt={name}
        />
      </div>
      <div className={S['dm-chat-list-item-right']}>
        <span className={S['name']}>{name}</span>
        <span className={S['last-message']}>{lastMessage}</span>
      </div>
    </div>
  )
}
