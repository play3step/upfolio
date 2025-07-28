import S from './Layout.module.css'

import { Header } from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import { Outlet } from 'react-router-dom'
import { MyPageSidebar } from '@/components/domain/mypage/MyPageSidebar'

import DmDropdownWrapper from '@/components/domain/dm/DmDropdownWrapper'
import { useState } from 'react'
import { usePortfolio, type PortfolioItem } from '@/hooks/usePortfolio'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null)
  const { portfolio, setPortfolio } = usePortfolio(userId)
  const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>(
    []
  )
  const showSidebar = window.location.pathname.includes('/mypage')

  const handleSearch = (keyword: string) => {
    const filtered = portfolio.filter(item =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredPortfolio(filtered)
  }

  return (
    <div className={S['wrapper']}>
      <Header onSearch={handleSearch} />
      <div className={S['layout']}>
        {showSidebar && <MyPageSidebar />}

        <main className={S['main']}>
          <Outlet />
          {children}
        </main>
        <div className={S['dm--button-position']}>
          <DmDropdownWrapper />
        </div>
      </div>
      <Footer />
    </div>
  )
}
