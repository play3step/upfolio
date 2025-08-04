import { useState } from 'react'
import { AlarmContext } from './AlarmContext.tsx'

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
