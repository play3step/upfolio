import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'

export default function DmChatContainer() {
  return (
    <div className={S['dm-chat-container']}>
      <div className={S['dm-chat-container-left']}>DmChatContainer</div>
      <div className={S['dm-chat-container-right']}>
        <div className={S['dm-chat-conversation']}>DmChatContainer</div>
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
