import S from './Layout.module.css'

import { Header } from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import { Outlet } from 'react-router-dom'
import { MyPageSidebar } from '@/components/mypage/MyPageSidebar'
import { AuthContext } from '@/context/AuthContext'
import DmDropdownWrapper from '@/components/dm/DmDropdownWrapper'
import { useContext } from 'react'
import AlarmWrapper from '@/components/alarm/alarmWrapper'
// import { useState } from 'react'
// import { usePortfolio, type PortfolioItem } from '@/hooks/usePortfolio'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // const [userId, setUserId] = useState<string | null>(null)
  // const { portfolio, setPortfolio } = usePortfolio(userId)
  // const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>(
  //   []
  // )
  const showSidebar = window.location.pathname.includes('/mypage')
  const { isAuthenticated } = useContext(AuthContext)

  // const handleSearch = (keyword: string) => {
  //   const filtered = portfolio.filter(item =>
  //     item.title.toLowerCase().includes(keyword.toLowerCase())
  //   )
  //   setFilteredPortfolio(filtered)
  // }

  return (
    <div className={S['wrapper']}>
      <Header />
      <div className={S['layout']}>
        {showSidebar && <MyPageSidebar />}
        <main className={S['main']}>
          <Outlet />
          {children}
        </main>

        {isAuthenticated && (
          <>
            <div className={S['alarm--button-position']}>
              <AlarmWrapper />
            </div>
            <div className={S['dm--button-position']}>
              <DmDropdownWrapper />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
