import S from './Layout.module.css'

import { Header } from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import { AuthContext } from '@/context/auth/AuthContext'
import DmDropdownWrapper from '@/components/dm/DmDropdownWrapper'
import { useContext } from 'react'
import AlarmWrapper from '@/components/alarm/alarmWrapper'
import { useIsMobile } from '@/hooks/header/useIsMobile'
// import { useState } from 'react'
// import { usePortfolio, type PortfolioItem } from '@/hooks/usePortfolio'

interface LayoutProps {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useContext(AuthContext)

  const isMobile = useIsMobile()
  return (
    <div className={S['wrapper']}>
      {/* 헤더 */}
      <Header isMobile={isMobile} />
      <div className={S.layout}>
        {/* 메인 */}
        <main className={S.main}>{children}</main>
        {/* 알림 */}
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
      {/* 푸터 */}
      <Footer />
    </div>
  )
}
