import supabase from '@/lib/supabaseClient'

export const fetchMessages = async (threadId: string) => {
  const { data, error } = await supabase
    .from('DMMessage')
    .select('*')
    .eq('threadid', threadId)
    .order('createdat', { ascending: true })

  if (error) {
    throw error
  }
  return data
}

export const addMessage = async (
  threadId: string,
  message: string,
  senderid: string,
  createdAt: Date
) => {
  const { data, error } = await supabase.from('DMMessage').insert({
    threadid: threadId,
    message: message,
    senderid: senderid,
    createdat: createdAt
  })

  if (error) {
    throw error
  }
  return data
}
