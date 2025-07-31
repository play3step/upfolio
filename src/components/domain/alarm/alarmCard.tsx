import S from './alarmCard.module.css'

interface AlarmCardProps {
  type: 'comment' | 'like' | 'dm'
  name: string
}

export default function AlarmCard({ type, name }: AlarmCardProps) {
  return (
    <div className={S['alarm-card']}>
      <div className={S['alarm-card-left']}></div>
      <div className={S['alarm-card-right']}>
        <p className={S['alarm-card-right-name']}>{name}</p>
        <p className={S['alarm-card-right-content']}>
          {`${name}님이 ${type === 'comment' ? '댓글을' : type === 'like' ? '좋아요를' : 'DM을'} 남겼습니다.`}
        </p>
      </div>
    </div>
  )
}
