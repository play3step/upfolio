import MobileHeader from './MobileHeader'
import { DesktopHeader } from './DesktopHeader'

interface HeaderProps {
  isMobile: boolean
}

export const Header = ({ isMobile }: HeaderProps) => {
  return isMobile ? <MobileHeader /> : <DesktopHeader />
}
