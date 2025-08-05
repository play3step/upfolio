import {
  fetchAlarms as fetchAlarmsAPI,
  readAllAlarms as readAllAlarmsAPI
} from '@/apis/alarm/alarm.controller'
import { AuthContext } from '@/context/auth/AuthContext'
import type { Notification, alarmType } from '@/types/notification'
import { useContext, useState } from 'react'

export const useAlarm = () => {
  const [alarmsData, setAlarmsData] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { authData } = useContext(AuthContext)

  const fetchAlarms = async (type: alarmType) => {
    setIsLoading(true)
    if (!authData?.id) {
      return
    }
    const newAlarms = await fetchAlarmsAPI(authData?.id, type, false)
    setAlarmsData(newAlarms)

    setIsLoading(false)
  }

  const readAllAlarms = async (type: alarmType) => {
    await readAllAlarmsAPI(authData?.id ?? '', type)
    fetchAlarms(type)
  }

  return {
    alarmsData,
    fetchAlarms,
    isLoading,
    readAllAlarms
  }
}
