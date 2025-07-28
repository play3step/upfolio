import { addMessage, fetchMessages } from '@/apis/dm/message.controller'
import type { Message } from '@/types/thread'
import { useState } from 'react'

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleFetchMessages = async (userId: string) => {
    const messages = await fetchMessages(userId)
    setMessages(messages)
  }

  const handleAddMessages = async (
    threadId: string,
    message: string,
    senderid: string,
    createdAt: Date
  ) => {
    const messages = await addMessage(threadId, message, senderid, createdAt)
    handleFetchMessages(threadId)
    return messages
  }

  return { messages, handleFetchMessages, handleAddMessages }
}
