import { addMessage, fetchMessages } from '@/apis/dm/message.controller'
import supabase from '@/lib/supabaseClient'
import type { Message } from '@/types/thread'
import { useState } from 'react'

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleFetchMessages = async (userId: string) => {
    const messages = await fetchMessages(userId)

    const messageList = Promise.all(
      messages.map(async message => {
        const user = await supabase
          .from('User')
          .select('*')
          .eq('id', message.senderid)
          .single()

        return {
          ...message,
          name: user?.data?.name,
          profile: user?.data?.profile
        }
      })
    )

    setMessages(await messageList)
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
