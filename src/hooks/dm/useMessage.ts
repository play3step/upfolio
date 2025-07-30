import { addMessage, fetchMessages } from '@/apis/dm/message.controller'

export const useMessage = () => {
  const handleFetchMessages = async (userId: string) => {
    const messages = await fetchMessages(userId)

    return messages
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

  return { handleFetchMessages, handleAddMessages }
}
