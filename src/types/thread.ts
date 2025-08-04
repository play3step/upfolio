export interface Thread {
  id: string
  lastMessage: string | null
  name: string
  profile: string
  receiverid: string
  senderid: string
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
