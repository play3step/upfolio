import throttle from 'lodash.throttle'
import { useEffect } from 'react'

export const useStickyMenu = (
  stickyRef: React.RefObject<HTMLElement>,
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!stickyRef.current) return

      const stickyPosition = stickyRef.current.getBoundingClientRect().top ?? 0
      const yes = stickyPosition <= 0
      setIsSticky(yes)
    }, 200)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
    }
  }, [stickyRef, setIsSticky])
