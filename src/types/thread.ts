export interface Thread {
  id: string
  name: string
  lastMessage: string | null
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
