import { Outlet } from 'react-router-dom'
import S from './Mypage.module.css'
import { MyPageSidebar } from '@/components/mypage/MyPageSidebar'
interface LayoutProps {
  children?: React.ReactNode
}

function MyPage({ children }: LayoutProps) {
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
