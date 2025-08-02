import { Link, NavLink } from 'react-router-dom'
import S from './SideNavList.module.css'
import Sb from './Button.module.css'
import { useAuth } from '@/hooks/auth/useAuth'

interface Props {
  isOpen: boolean
  isClose: () => void
}

function SideNavList({ isOpen, isClose }: Props) {
  const { isAuthenticated, logout } = useAuth()

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
            </li>
          </ul>
        </nav>

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout()
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
