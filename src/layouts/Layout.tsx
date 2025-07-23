import S from './Layout.module.css'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S['wrapper']}>
      <Header />
      <main className={S['main']}>{children}</main>
      <Footer />
    </div>
  )
}
