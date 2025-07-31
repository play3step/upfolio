import S from './alarmWrapper.module.css'
import AlarmCard from './alarmCard'
import { useState } from 'react'

export default function AlarmWrapper() {
  const [selected, setSelected] = useState<'comment' | 'like' | 'dm'>('comment')
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
        <AlarmCard />
        <AlarmCard />
        <AlarmCard />
        <AlarmCard />
      </div>
    </div>
  )
}
