import { useMessage } from './useMessage'
import type { Message, Thread } from '@/types/thread'
import { useEffect, useState } from 'react'
import { useThreads } from './useThreads'

export const usePollingMessages = (
  threadId: string,
  interval: number = 3000
) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [threads, setThreads] = useState<Thread[]>([])

  const { handleFetchMessages } = useMessage()
  const { handleFetchThreads } = useThreads()

  const loadMessages = async () => {
    try {
      if (!threadId) return
      const newMessages = await handleFetchMessages(threadId)
      setMessages(newMessages)
    } catch (error) {
      console.error(error)
    }
  }

  const loadThreads = async () => {
    try {
      const newThreads = await handleFetchThreads()
      setThreads(newThreads ?? [])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadMessages()
    loadThreads()
    const timer = setInterval(() => {
      loadMessages()
      loadThreads()
    }, interval)

    return () => clearInterval(timer)
  }, [threadId])

  return { messages, threads }
}
