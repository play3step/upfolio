import MobileHeader from './MobileHeader'
import { DesktopHeader } from './DesktopHeader'
import { useIsMobile } from '@/hooks/header/useIsMobile'

interface HeaderProps {
  isMobile: boolean
}

export const Header = ({ isMobile }: HeaderProps) => {
  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
