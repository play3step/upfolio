import S from './alarmWrapper.module.css'
import AlarmCard from './alarmCard'

export default function AlarmWrapper() {
  return (
    <div className={S['alarm-wrapper']}>
      <div className={S['alarm-header']}>
        <h1>알림</h1>
      </div>
      <div className={S['alarm-select']}>
        <p>댓글</p>
        <p>좋아요</p>
        <p>DM</p>
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
