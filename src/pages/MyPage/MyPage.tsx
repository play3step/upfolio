import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import S from './Mypage.module.css'
import { MyPageSidebar } from '@/components/mypage/MyPageSidebar'
import { useEffect } from 'react'
interface LayoutProps {
  children?: React.ReactNode
}

function MyPage({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/mypage') {
      navigate('/mypage/profile', { replace: true }) // 기본 경로를 profile로 이동
    }
  }, [location, navigate])

  return (
    <div className={S.layoutOuter}>
      <MyPageSidebar />
      <div className={S.contentWrapper}>
        <Outlet />
        {children}
      </div>
    </div>
  )
}
export default MyPage
