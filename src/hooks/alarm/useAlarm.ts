import { fetchAlarms as fetchAlarmsAPI } from '@/apis/alarm/alarm.controller'
import { AuthContext } from '@/context/auth/AuthContext'
import type { alarmType } from '@/types/notification'
import { useContext, useState } from 'react'

export const useAlarm = () => {
  const [alarmsData, setAlarmsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { authData } = useContext(AuthContext)

  const fetchAlarms = async (type: alarmType) => {
    setIsLoading(true)
    const newAlarms = await fetchAlarmsAPI(authData?.id ?? '', type, false)
    setAlarmsData(newAlarms)
    console.log(newAlarms)
    setIsLoading(false)
  }

  return {
    alarmsData,
    fetchAlarms,
    isLoading
  }
}
