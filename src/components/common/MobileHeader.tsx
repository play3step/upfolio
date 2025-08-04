import { Link } from 'react-router-dom'
import S from './MobileHeader.module.css'
import logo from '@/assets/logo.svg'
import hamburger from '@/assets/icon/hamburger.svg'
import close from '@/assets/icon/close.svg'
import SideNavList from './SideNavList'
import { useContext, useEffect, useRef, useState } from 'react'
import dmIcon from '@/assets/icon/dm-primary.svg'

import { DmContext } from '@/context/dm/DmContext'

function MobileHeader() {
  const [showHeader, setShowHeader] = useState(true)

  const { toggleDm } = useContext(DmContext)
  const lastScrollY = useRef(0)

  const [isSideNavOpen, setSideNavOpen] = useState(false)

  const handleOpenSide = () => {
    setSideNavOpen(true)
  }

  const handleCloseSide = () => {
    setSideNavOpen(false)
  }

  useEffect(() => {
    if (isSideNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSideNavOpen])

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
    <>
      <header className={`${S.header} ${!showHeader ? S.hide : ''}`}>
        <Link
          to="/"
          className={S['header__logo']}
          title="Upfolio 메인 바로가기"
          onClick={handleCloseSide}>
          <img
            src={logo}
            alt="Upfolio 로고"
          />
        </Link>

        <div className={S['header_right']}>
          <button
            className={S['dm-button']}
            onClick={toggleDm}>
            <img
              src={dmIcon}
              alt="DM"
              className={S['dm-button-icon']}
            />
          </button>

          {isSideNavOpen ? (
            <button
              type="button"
              className={S['header__navBtn']}
              onClick={handleCloseSide}>
              <img
                src={close}
                alt="모바일 메뉴 리스트 닫기"
              />
            </button>
          ) : (
            <button
              type="button"
              className={S['header__navBtn']}
              onClick={handleOpenSide}>
              <img
                src={hamburger}
                alt="모바일 메뉴 버튼"
              />
            </button>
          )}
        </div>

        {isSideNavOpen ? (
          <button
            type="button"
            className={S['header__navBtn']}
            onClick={handleCloseSide}>
            <img
              src={close}
              alt="모바일 메뉴 리스트 닫기"
            />
          </button>
        ) : (
          <button
            type="button"
            className={S['header__navBtn']}
            onClick={handleOpenSide}>
            <img
              src={hamburger}
              alt="모바일 메뉴 버튼"
            />
          </button>
        )}
      </header>
      <SideNavList
        isOpen={isSideNavOpen}
        isClose={handleCloseSide}
      />
    </>
  )
}
export default MobileHeader
