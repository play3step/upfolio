import S from './Layout.module.css'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import DmDropdownWrapper from '@/components/domain/dm/DmDropdownWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S['wrapper']}>
      <Header />
      <main className={S['main']}>{children}</main>
      <div className={S['dm--button-position']}>
        <DmDropdownWrapper />
      </div>
      <Footer />
    </div>
  )
}
