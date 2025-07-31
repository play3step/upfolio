import S from './alarmWrapper.module.css'
import AlarmCard from './alarmCard'
import { useContext, useState } from 'react'
import { AlarmContext } from '@/context/alarm/AlarmContext'

export default function AlarmWrapper() {
  const [selected, setSelected] = useState<'comment' | 'like' | 'dm'>('comment')

  const { alarm } = useContext(AlarmContext)

  console.log(alarm)

  if (!alarm) return null

  return (
    <div className={S['alarm-wrapper']}>
      <div className={S['alarm-header']}>
        <h1>알림</h1>
      </div>
      <div className={S['alarm-select']}>
        <p
          className={selected === 'comment' ? S['alarm-select-active'] : ''}
          onClick={() => setSelected('comment')}>
          댓글
        </p>
        <p
          className={selected === 'like' ? S['alarm-select-active'] : ''}
          onClick={() => setSelected('like')}>
          좋아요
        </p>
        <p
          className={selected === 'dm' ? S['alarm-select-active'] : ''}
          onClick={() => setSelected('dm')}>
          DM
        </p>
      </div>
      <div className={S['alarm-content']}>
        {selected === 'comment' && (
          <AlarmCard
            type="comment"
            name="구르르르"
          />
        )}
        {selected === 'like' && (
          <AlarmCard
            type="like"
            name="치르르르"
          />
        )}
        {selected === 'dm' && (
          <AlarmCard
            type="dm"
            name="삐삐삐삐"
          />
        )}
      </div>
    </div>
  )
}
