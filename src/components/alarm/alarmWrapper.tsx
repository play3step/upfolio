import S from './alarmWrapper.module.css'
import AlarmCard from './alarmCard'
import { useContext, useEffect, useRef, useState } from 'react'
import { AlarmContext } from '@/context/alarm/AlarmContext'
import { useAlarm } from '@/hooks/alarm/useAlarm'
import type { alarmType } from '@/types/notification'

export default function AlarmWrapper() {
  const [selected, setSelected] = useState<alarmType>('comment')

  const { alarm, toggleAlarm } = useContext(AlarmContext)

  const { alarmsData, fetchAlarms, readAllAlarms } = useAlarm()

  const alarmRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (alarm && !alarmRef.current?.contains(e.target as Node)) {
        toggleAlarm()
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [alarm])

  const handleFetchAlarms = (type: alarmType) => {
    setSelected(type)
    fetchAlarms(type)
  }

  useEffect(() => {
    fetchAlarms(selected)
  }, [selected])

  if (!alarm) return null

  return (
    <div
      className={S['alarm-wrapper']}
      ref={alarmRef}>
      <div className={S['alarm-header']}>
        <h1>알림</h1>
      </div>
      <div className={S['alarm-select']}>
        <p
          className={selected === 'comment' ? S['alarm-select-active'] : ''}
          onClick={() => handleFetchAlarms('comment')}>
          댓글
        </p>
        {/* <p
          className={selected === 'like' ? S['alarm-select-active'] : ''}
          onClick={() => handleFetchAlarms('like')}>
          좋아요
        </p> */}
        <p
          className={selected === 'dm' ? S['alarm-select-active'] : ''}
          onClick={() => handleFetchAlarms('dm')}>
          DM
        </p>
      </div>
      <div className={S['alarm-content']}>
        {alarmsData.map(alarm => (
          <AlarmCard
            key={alarm.id}
            type={alarm.type}
            name={alarm.sender.name}
            profile_image={alarm.sender.profile_image}
          />
        ))}
      </div>
      <div className={S['alarm-footer']}>
        <p onClick={() => readAllAlarms(selected)}>알림 모두 읽음</p>
      </div>
    </div>
  )
}
