export type alarmType = 'comment' | 'dm' | 'like'

export interface Alarm {
  id: string
  sender_id: string
  receiver_id: string
  type: alarmType
  referenceid: string
  isread: boolean
  createdat: Date
}
