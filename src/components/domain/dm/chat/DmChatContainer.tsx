import S from './DmChatContainer.module.css'
import dmSendIcon from '@/assets/icon/dm.svg'
import DmChatListItem from './DmChatListItem'
import DmChatMessage from './DmChatMessage'

interface Props {
  isOpen: boolean
}

export default function DmChatContainer({ isOpen }: Props) {
  return (
    <div
      className={S['dm-chat-container']}
      style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className={S['dm-chat-container-left']}>
        <DmChatListItem />
        <DmChatListItem />
        <DmChatListItem />
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
