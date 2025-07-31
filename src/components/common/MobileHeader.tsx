import { Link } from 'react-router-dom'
import S from './MobileHeader.module.css'
import logo from '@/assets/logo.svg'
import hamburger from '@/assets/icon/hamburger.svg'
import SideNavList from './SideNavList'

function MobileHeader() {
  return (
    <header className={`${S.header}`}>
      <Link
        to="/"
        className={S['header__logo']}
        title="Upfolio 메인 바로가기">
        <img
          src={logo}
          alt="Upfolio 로고"
        />
      </Link>

      <button
        type="button"
        className={S['header__navBtn']}>
        <img
          src={hamburger}
          alt="모바일 메뉴 버튼"
        />
      </button>

      <SideNavList />
    </header>
  )
}
export default MobileHeader
