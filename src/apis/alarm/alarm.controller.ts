import supabase from '@/lib/supabaseClient'
import type { alarmType, Notification } from '@/types/notification'

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
): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('Notification')
    .select('*')
    .eq('receiver_id', userid)
    .eq('type', type)
    .eq('isread', isread)
    .order('createdat', { ascending: false })

  const alarmsData = await Promise.all(
    (data || []).map(async (item: Notification) => {
      const { data: userData, error: userError } = await supabase
        .from('User')
        .select('*')
        .eq('id', item.sender_id)
        .single()

      if (userError) {
        throw userError
      }

      item.sender = {
        id: userData?.id,
        name: userData?.nickname,
        profile_image: userData?.profileimage
      }

      return item
    })
  )
  if (error) {
    throw error
  }
  return alarmsData
}

export const readAllAlarms = async (userid: string, type: alarmType) => {
  const { data, error } = await supabase
    .from('Notification')
    .update({ isread: true })
    .eq('receiver_id', userid)
    .eq('type', type)

  if (error) {
    throw error
  }
  return data
}
