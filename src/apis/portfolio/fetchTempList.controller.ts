import supabase from '@/lib/supabaseClient'

export const fetchTempPortfolioList = async (userId: string) => {
  const { data, error } = await supabase
    .from('TempPortfolio')
    .select('id,title,createdAt')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })

  if (error) throw error

  return data ?? []
}
