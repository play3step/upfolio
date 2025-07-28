import { useMessage } from './useMessage'
import type { Message, Thread } from '@/types/thread'
import { useEffect, useState } from 'react'
import { useThreads } from './useThreads'

interface Props {
  threadId: string
  interval?: number
  isOpen: boolean
}

export const usePollingMessages = ({
  threadId,
  interval = 3000,
  isOpen
}: Props) => {
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
    if (!isOpen) return

    loadMessages()
    loadThreads()
    const timer = setInterval(() => {
      loadMessages()
      loadThreads()
    }, interval)

    return () => clearInterval(timer)
  }, [threadId, isOpen])

  return {
    messages,
    threads
  }
}
