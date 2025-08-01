import { createContext } from 'react'

export interface AlarmContextType {
  alarm: boolean
  toggleAlarm: () => void
}

export const AlarmContext = createContext<AlarmContextType>({
  alarm: false,
  toggleAlarm: () => {}
})
