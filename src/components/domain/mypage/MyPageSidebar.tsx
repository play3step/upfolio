import { NavLink } from 'react-router-dom'
import S from './MyPageSidebar.module.css'

export function MyPageSidebar() {
  return (
    <>
      <aside className={S.sidebar}>
        <h2 className={S.sidebar__title}>마이페이지</h2>
        <hr className={S.sidebar__divider} />
        <ul className={S.sidebar__list}>
          <li>
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive ? S.active : '')}
              end>
              내 프로필
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/posts"
              className={({ isActive }) => (isActive ? S.active : '')}>
              내가 작성한 글 / 댓글
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/bookmarks"
              className={({ isActive }) => (isActive ? S.active : '')}>
              좋아요 / 북마크한 글
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/drafts"
              className={({ isActive }) => (isActive ? S.active : '')}>
              임시저장한 글
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  )
}
