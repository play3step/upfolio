import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  const currentWidth = window.innerWidth
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [currentWidth])

  return isMobile
}
