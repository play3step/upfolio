import { useContext, useEffect, useState } from 'react'
import { fetchThreads } from '@/apis/dm/dm.controller'
import { AuthContext } from '@/context/AuthContext'

interface Thread {
  id: string
  name: string
  lastMessage: string
}

export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([])

  const { authData } = useContext(AuthContext)

  useEffect(() => {
    const handleFetchThreads = async () => {
      const threads = await fetchThreads(authData?.id ?? '')
      setThreads(threads)
    }
    handleFetchThreads()
  }, [])

  return { threads }
}
