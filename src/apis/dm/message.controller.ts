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
