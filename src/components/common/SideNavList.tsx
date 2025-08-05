import { Link, NavLink, useNavigate } from 'react-router-dom'
import S from './SideNavList.module.css'
import Sb from './Button.module.css'
import { useAuth } from '@/hooks/auth/useAuth'

interface Props {
  isOpen: boolean
  isClose: () => void
}

function SideNavList({ isOpen, isClose }: Props) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div
        className={`${S['overlay']} ${isOpen ? S.show : ''}`}
        onClick={isClose}></div>

      <div
        role="dialog"
        aria-modal="true"
        tabIndex={isOpen ? 0 : -1}
        className={`${S.side} ${isOpen ? S.open : ''}`}>
        <nav className={S['side__nav']}>
          <ul>
            {isAuthenticated ? (
              <li>
                <NavLink
                  to="/portfolio/new"
                  className={({ isActive }) => (isActive ? S.selected : '')}
                  onClick={isClose}>
                  포트폴리오 등록
                </NavLink>
              </li>
            ) : (
              ''
            )}
            <li>
              <NavLink
                to="/mypage"
                className={({ isActive }) => (isActive ? S.selected : '')}
                onClick={isClose}>
                마이페이지
              </NavLink>
              <ul className={S['side__nav__depth2']}>
                <li>
                  <NavLink
                    to="/mypage/profile"
                    className={({ isActive }) => (isActive ? S.selected : '')}
                    onClick={isClose}>
                    내 프로필
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mypage/posts"
                    className={({ isActive }) => (isActive ? S.selected : '')}
                    onClick={isClose}>
                    내가 작성한 글 / 댓글
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mypage/bookmarks"
                    className={({ isActive }) => (isActive ? S.selected : '')}
                    onClick={isClose}>
                    북마크 / 좋아요 한 글
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/mypage/edit"
                    className={({ isActive }) => (isActive ? S.selected : '')}
                    onClick={isClose}>
                    임시저장 한 글
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        {isAuthenticated ? (
          <button
            onClick={async () => {
              logout()
              navigate('/')
              isClose()
            }}
            className={`${Sb.btn} ${S['side__loginBtn']}`}>
            <span className={Sb.btn__txt}>Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className={`${Sb.btn} ${S['side__loginBtn']}`}
            onClick={isClose}>
            <span className={Sb.btn__txt}>Login</span>
          </Link>
        )}
      </div>
    </>
  )
}
export default SideNavList
