import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from './DmChatListItem'

export default function DmChatContainer() {
  return (
    <div className={S['dm-chat-container']}>
      <div className={S['dm-chat-container-left']}>
        <DmChatListItem />
        <DmChatListItem />
        <DmChatListItem />
      </div>
      <div className={S['dm-chat-container-right']}>
        <div className={S['dm-chat-conversation']}></div>
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
