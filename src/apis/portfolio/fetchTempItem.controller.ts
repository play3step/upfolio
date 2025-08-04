import supabase from '@/lib/supabaseClient'

export const fetchTempPortfolioItem = async (id: string) => {
  const { data, error } = await supabase
    .from('TempPortfolio')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error

  return data ?? null
}
