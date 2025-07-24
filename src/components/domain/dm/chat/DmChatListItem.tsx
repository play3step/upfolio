import S from './DmChatListItem.module.css'

export default function DmChatListItem() {
  return (
    <div className={S['dm-chat-list-item']}>
      <div className={S['dm-chat-list-item-left']}>
        <div className={S['dm-chat-list-item-left-profile']}></div>
      </div>
      <div className={S['dm-chat-list-item-right']}>
        <span>John Doe</span>
        <span>마지막 메시지 머시기머시기</span>
      </div>
    </div>
  )
}
