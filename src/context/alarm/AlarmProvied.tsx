import { useContext, useState } from 'react'
import { AlarmContext, type AlarmContextType } from './AlarmContext'

export const AlarmProvider = ({ children }: { children: React.ReactNode }) => {
  const [alarm, setAlarm] = useState(false)

  const toggleAlarm = () => {
    setAlarm(prev => !prev)
  }

  return (
    <AlarmContext.Provider value={{ alarm, toggleAlarm }}>
      {children}
    </AlarmContext.Provider>
  )
}

export const useAlarm = () => {
  const context = useContext<AlarmContextType>(AlarmContext)
  if (!context) {
    throw new Error('useAlarm must be used within an AlarmProvider')
  }
  return context
}
