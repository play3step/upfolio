import S from './alarmCard.module.css'

interface AlarmCardProps {
  type: 'comment' | 'like' | 'dm'
  name: string
  profile_image: string
  referenceid: string
  handleMovement: (referenceid: string) => void
}

export default function AlarmCard({
  type,
  name,
  profile_image,
  referenceid,
  handleMovement
}: AlarmCardProps) {
  return (
    <div
      className={S['alarm-card']}
      onClick={() => handleMovement(referenceid)}>
      <div className={S['alarm-card-left']}>
        <img
          src={profile_image}
          alt="profile"
        />
      </div>
      <div className={S['alarm-card-right']}>
        <p className={S['alarm-card-right-name']}>{name}</p>
        <p className={S['alarm-card-right-content']}>
          {`${name}님이 ${type === 'comment' ? '댓글을' : type === 'like' ? '좋아요를' : 'DM을'} 남겼습니다.`}
        </p>
      </div>
    </div>
  )
}
