import { Link } from 'react-router-dom'
import S from './Footer.module.css'
import logo from '@/assets/logo.svg'

export default function Footer() {
  return (
    <footer className={S.footer}>
      <div className={S.footer__inner}>
        <div className={S.footer__left}>
          <p>Copyright 2025. I’m this INC. All rights reserved.</p>
        </div>
        <div className={S.footer__middle}>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className={S.footer__right}>
          <p>이용약관</p>
          <p>개인정보처리방침</p>
        </div>
      </div>
    </footer>
  )
}
