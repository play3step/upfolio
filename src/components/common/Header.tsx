import S from './Header.module.css'
import Sb from './Button.module.css'
import logo from '@/assets/logo.svg'
import person from '@/assets/icon/person.svg'
import alarm from '@/assets/icon/alarm.svg'
import search from '@/assets/icon/search.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/auth/useAuth'
import { useSearch } from '@/context/SearchContext'

export const Header = ({
  onSearch
}: {
  onSearch: (keyword: string) => void
}) => {
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)
  const { isAuthenticated, logout } = useAuth()
  const [searchKeyword, setSearchKeyword] = useState('')
  const { setKeyword } = useSearch()
  const navigate = useNavigate()

  console.log('Header 렌더링됨, isAuthenticated:', isAuthenticated)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSearchSubmit = () => {
    setKeyword(searchKeyword)
    navigate('/')
  }
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <header className={`${S.header} ${!showHeader ? S.hide : ''}`}>
      <div className={S.header__inner}>
        <div className={S.header__left}>
          <Link
            to="/"
            className={S.header__left__logo}>
            <img
              src={logo}
              alt="Upfolio 메인"
            />
          </Link>
          <nav className={S.header__left__nav}>
            <ul>
              <li>
                <NavLink
                  to="/portfolios"
                  className={({ isActive }) => (isActive ? S.selected : '')}>
                  인기 포트폴리오
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/portfolio/new"
                  className={({ isActive }) => (isActive ? S.selected : '')}>
                  포트폴리오 등록
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={S.header__right}>
          <div className={S.header__right__search}>
            <label
              htmlFor="headerSearch"
              className="a11y-hidden">
              포트폴리오 검색
            </label>
            <button
              type="button"
              onClick={handleSearchSubmit}>
              <img
                src={search}
                alt="search"
                aria-hidden="true"
              />
            </button>

            <input
              id="headerSearch"
              name="headerSearch"
              type="text"
              placeholder="포트폴리오 검색"
              value={searchKeyword}
              onChange={handleSearchChange}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                }
              }}
            />
          </div>
          <Link
            to="/mypage"
            type="button"
            className={S['header__iconbtn']}>
            <img
              src={person}
              alt="person"
            />
          </Link>
          <button
            type="button"
            className={S['header__iconbtn']}>
            <img
              src={alarm}
              alt="alarm"
            />
          </button>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className={Sb.btn}>
              <span className={Sb.btn__txt}>Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className={Sb.btn}>
              <span className={Sb.btn__txt}>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
