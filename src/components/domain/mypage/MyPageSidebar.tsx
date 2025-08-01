import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import S from './MyPageSidebar.module.css'

export function MyPageSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)
  const [open, setOpen] = useState(window.innerWidth > 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024
      setIsMobile(mobile)
      setOpen(!mobile)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => setOpen(prev => !prev)

  return (
    <>
      {isMobile && (
        <button
          className={S.toggleButton}
          onClick={handleToggle}
          aria-label="사이드바 토글">
          {open ? '←' : '→'}
        </button>
      )}
      <aside
        className={`${S.sidebar} ${isMobile && !open ? S['sidebar--closed'] : ''}`}>
        <h2 className={S.sidebar__title}>마이페이지</h2>
        <hr className={S.sidebar__divider} />
        <ul className={S.sidebar__list}>
          <li onClick={() => isMobile && setOpen(false)}>
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive ? S.active : '')}
              end>
              내 프로필
            </NavLink>
          </li>
          <li onClick={() => isMobile && setOpen(false)}>
            <NavLink
              to="/mypage/posts"
              className={({ isActive }) => (isActive ? S.active : '')}>
              내가 작성한 글 / 댓글
            </NavLink>
          </li>
          <li onClick={() => isMobile && setOpen(false)}>
            <NavLink
              to="/mypage/bookmarks"
              className={({ isActive }) => (isActive ? S.active : '')}>
              북마크한 글 / 좋아요
            </NavLink>
          </li>
          <li onClick={() => isMobile && setOpen(false)}>
            <NavLink
              to="/mypage/edit"
              className={({ isActive }) => (isActive ? S.active : '')}>
              임시저장한 글
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  )
}
