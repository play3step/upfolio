import S from './Header.module.css'
import Sb from './Button.module.css'
import logo from '@/assets/logo.svg'
import person from '@/assets/icon/person.svg'
import alarm from '@/assets/icon/alarm.svg'
import search from '@/assets/icon/search.svg'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [showHeader, setShowHeader] = useState(true)
  const lastScrollY = useRef(0)

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
            <img
              src={search}
              alt="search"
              aria-hidden="true"
            />
            <input
              id="headerSearch"
              name="headerSearch"
              type="text"
              placeholder="포트폴리오 검색"
            />
          </div>
          <button
            type="button"
            className={S['header__iconbtn']}>
            <img
              src={person}
              alt="person"
            />
          </button>
          <button
            type="button"
            className={S['header__iconbtn']}>
            <img
              src={alarm}
              alt="alarm"
            />
          </button>
          <Link
            to="/login"
            className={Sb.btn}>
            <span className={Sb.btn__txt}>Login</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
