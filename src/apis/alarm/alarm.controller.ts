import supabase from '@/lib/supabaseClient'
import type { alarmType } from '@/types/notification'

export const sendAlarm = async (
  senderid: string,
  receiverid: string,
  type: alarmType,
  referenceid: string,
  isread: boolean,
  createdat: Date
) => {
  const { data, error } = await supabase.from('Notification').insert({
    sender_id: senderid,
    receiver_id: receiverid,
    type: type,
    referenceid: referenceid,
    isread: isread,
    createdat: createdat
  })

  if (error) {
    throw error
  }
  return data
}

export const fetchAlarms = async (
  userid: string,
  type: alarmType,
  isread: boolean
) => {
  const { data, error } = await supabase
    .from('Notification')
    .select('*')
    .eq('receiver_id', userid)
    .eq('type', type)
    .eq('isread', isread)
    .order('createdat', { ascending: false })
  if (error) {
    throw error
  }
  return data
}
