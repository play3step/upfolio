import MobileHeader from './MobileHeader'
import { DesktopHeader } from './DesktopHeader'
import { useIsMobile } from '@/hooks/header/useIsMobile'

export const Header = () => {
  const isMobile = useIsMobile()

  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
