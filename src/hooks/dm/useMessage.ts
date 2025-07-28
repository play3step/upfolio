import { fetchMessages } from '@/apis/dm/message.controller'
import type { Message } from '@/types/thread'
import { useState } from 'react'

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleFetchMessages = async (userId: string) => {
    const messages = await fetchMessages(userId)
    setMessages(messages)
  }

  return { messages, handleFetchMessages }
}
