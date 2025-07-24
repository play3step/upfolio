import S from './Layout.module.css'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import DMToggleButton from '@/components/domain/dm/DMToggleButton'
import DmChatContainer from '@/components/domain/dm/DmChatContainer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S['wrapper']}>
      <Header />
      <main className={S['main']}>
        {children}
        <div className={S['dm--button-position']}>
          <DmChatContainer />
          <DMToggleButton />
        </div>
      </main>
      <Footer />
    </div>
  )
}
