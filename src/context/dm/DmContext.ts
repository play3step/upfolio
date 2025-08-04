import { createContext } from 'react'

export interface DmContextType {
  dm: boolean
  toggleDm: () => void
}

export const DmContext = createContext<DmContextType>({
  dm: false,
  toggleDm: () => {}
})
