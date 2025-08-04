import { useContext } from 'react'
import S from './alarmCard.module.css'
import { DmContext } from '@/context/dm/DmContext'

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
  const { toggleDm } = useContext(DmContext)
  return (
    <div
      className={S['alarm-card']}
      onClick={() => {
        if (type === 'dm') {
          toggleDm()
        } else {
          handleMovement(referenceid)
        }
      }}>
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
