import supabase from '@/lib/supabaseClient'

type alarmType = 'comment' | 'dm' | 'like'

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

export const fetchAlarms = async (userid: string) => {
  const { data, error } = await supabase
    .from('Notification')
    .select('*')
    .eq('userid', userid) //  받는 사람 아이디로 해야하는데...
    .order('createdat', { ascending: false })

  if (error) {
    throw error
  }
  return data
}
