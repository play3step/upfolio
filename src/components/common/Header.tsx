import S from './Header.module.css'
import logo from '@/assets/logo.svg'
import person from '@/assets/icon/person.svg'
import alarm from '@/assets/icon/alarm.svg'
import search from '@/assets/icon/search.svg'
import Button from './Button'

export default function Header() {
  return (
    <header className={S.header}>
      <div className={S.header__left}>
        <img
          src={logo}
          alt="logo"
        />
        <div className={S.header__left__text}>
          <p>인기 포트폴리오</p>
          <p>포트폴리오 등록</p>
        </div>
      </div>
      <div className={S.header__right}>
        <div className={S.header__right__search}>
          <img
            src={search}
            alt="search"
          />
          <input
            type="text"
            placeholder="포트폴리오 검색"
          />
        </div>
        <img
          src={person}
          alt="person"
        />
        <img
          src={alarm}
          alt="alarm"
        />
        <Button type="button">Login</Button>
      </div>
    </header>
  )
}
