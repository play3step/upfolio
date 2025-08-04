export interface Thread {
  id: string
  lastMessage: string | null
  lastMessageTime: string | null
  name: string
  profile: string
  myId: string
  otherId: string
  isUserA: boolean
}

export interface Message {
  id: string
  threadid: string
  senderid: string
  message: string
  createdat: string
  name: string
  profile: string
}
