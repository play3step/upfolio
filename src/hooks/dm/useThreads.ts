import { useContext, useEffect, useState } from 'react'
import { addThreads, fetchThreads } from '@/apis/dm/threads.controller'
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

  const handleAddThreads = async (otherUserId: string) => {
    const threads = await addThreads(
      authData?.id ?? '',
      otherUserId,
      new Date().toISOString()
    )
    console.log(threads)
  }

  return { threads, handleAddThreads }
}
