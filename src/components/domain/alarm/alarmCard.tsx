import S from './alarmCard.module.css'

export default function AlarmCard() {
  return (
    <div className={S['alarm-card']}>
      <div className={S['alarm-card-left']}></div>
      <div className={S['alarm-card-right']}>
        <p className={S['alarm-card-right-name']}>이름</p>
        <p className={S['alarm-card-right-content']}>
          보낸사람님이 포트폴리오에 좋아요를 남겼습니다.
        </p>
      </div>
    </div>
  )
}
