import { addMessage, fetchMessages } from '@/apis/dm/message.controller'
import { sendAlarm } from '@/apis/alarm/alarm.controller'

export const useMessage = () => {
  const handleFetchMessages = async (userId: string) => {
    const messages = await fetchMessages(userId)

    return messages
  }

  const handleAddMessages = async (
    threadId: string,
    message: string,
    senderid: string,
    receiverid: string,
    createdAt: Date
  ) => {
    const messages = await addMessage(threadId, message, senderid, createdAt)

    if (senderid !== receiverid) {
      await sendAlarm(senderid, receiverid, 'dm', threadId, false, createdAt)
    }

    handleFetchMessages(threadId)
    return messages
  }

  return { handleFetchMessages, handleAddMessages }
}
