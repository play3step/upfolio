import S from './DmChatMessage.module.css'

interface Props {
  message: string
  isMine: boolean
}

export default function DmChatMessage({ message, isMine }: Props) {
  return (
    <div className={`${S.wrapper} ${isMine ? S.mine : S.other}`}>
      <div className={S.header}>
        {!isMine && <div className={S.profile} />}
        <div className={S.name}>{isMine ? '나' : '이름'}</div>
      </div>
      <p className={`${S.content} ${isMine ? S.mineContent : ''}`}>{message}</p>
    </div>
  )
}
