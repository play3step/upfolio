import supabase from '@/lib/supabaseClient'

export const deleteTempPortfolioItem = async (id: string) => {
  const { error } = await supabase.from('TempPortfolio').delete().eq('id', id)
  if (error) throw error
}
