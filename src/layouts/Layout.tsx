import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
