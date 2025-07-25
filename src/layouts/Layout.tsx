import S from './Layout.module.css'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { Outlet } from 'react-router-dom'
import { MyPageSidebar } from '@/components/domain/mypage/MyPageSidebar'
// import DmDropdownWrapper from '@/components/domain/dm/DmDropdownWrapper'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const showSidebar = window.location.pathname.includes('/mypage')

  return (
    <div className={S['wrapper']}>
      <Header />
      <div className={S['layout']}>
        {showSidebar && <MyPageSidebar />}
        <main className={S['main']}>
          <Outlet />
          {children}
          {/* <div className={S['dm--button-position']}>
          <DmDropdownWrapper />
        </div> */}
        </main>
      </div>
      <Footer />
    </div>
  )
}
