import supabase from '@/lib/supabaseClient'

const fetchThreads = async (userId: string) => {
  const { data, error } = await supabase
    .from('DMThread')
    .select('*')
    .eq('useraid', userId)
  if (error) {
    throw error
  }
  return data
}

export { fetchThreads }
