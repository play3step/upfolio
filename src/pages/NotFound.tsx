import { Link } from 'react-router-dom'
import S from './NotFound.module.css'

export const NotFound = () => {
  return (
    <div className={S['not-found']}>
      <h1 className={S.title}>404</h1>
      <p className={S.message}>페이지를 찾을 수 없습니다.</p>
      <p className={S['sub-message']}>
        요청하신 페이지가 삭제되었거나 잘못된 경로입니다.
      </p>
      <Link
        to="/"
        className={S['home-button']}>
        메인으로 돌아가기
      </Link>
    </div>
  )
}
