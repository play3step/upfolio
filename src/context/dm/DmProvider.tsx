import { useContext, useState } from 'react'
import { DmContext, type DmContextType } from './DmContext'

export const DmProvider = ({ children }: { children: React.ReactNode }) => {
  const [dm, setDm] = useState(false)

  const toggleDm = () => {
    setDm(prev => !prev)
  }

  return (
    <DmContext.Provider value={{ dm, toggleDm }}>{children}</DmContext.Provider>
  )
}

export const useDm = () => {
  const context = useContext<DmContextType>(DmContext)
  if (!context) {
    throw new Error('useDm must be used within an DmProvider')
  }
  return context
}
