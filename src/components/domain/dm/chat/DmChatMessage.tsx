import S from './DmChatMessage.module.css'

interface Props {
  message: string
  isMine: boolean
  name: string
  profile: string
}

export default function DmChatMessage({
  message,
  isMine,
  name,
  profile
}: Props) {
  return (
    <div className={`${S.wrapper} ${isMine ? S.mine : S.other}`}>
      <div className={S.header}>
        {!isMine && (
          <div
            className={S.profile}
            style={{
              backgroundImage: `url(${profile})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <div className={S.name}>{isMine ? '나' : name}</div>
      </div>
      <p className={`${S.content} ${isMine ? S.mineContent : ''}`}>{message}</p>
    </div>
  )
}
