export type alarmType = 'comment' | 'dm' | 'like'

export interface Notification {
  id: string
  sender_id: string
  sender: {
    id: string
    name: string
    profile_image: string
  }
  receiver_id: string
  type: alarmType
  referenceid: string
  isread: boolean
  createdat: Date
}
