import supabase from '@/lib/supabaseClient'

export const handleToggleBookmark = async (
  portfolioId: string,
  userId: string | null,
  next: boolean
): Promise<boolean> => {
  if (!userId) {
    console.error('User not authenticated')
    return false
  }

  try {
    if (next) {
      const { error } = await supabase
        .from('BookMark')
        .upsert({ portfolioid: portfolioId, userid: userId })
      if (error) {
        console.error('Error adding bookmark:', error.message)
        return false
      }
    } else {
      const { error } = await supabase
        .from('BookMark')
        .delete()
        .eq('userid', userId)
        .eq('portfolioid', portfolioId)
      if (error) {
        console.error('Error removing bookmark:', error.message)
        return false
      }
    }
    return true
  } catch (error) {
    console.error('Unexpected error in handleToggleBookmark:', error)
    return false
  }
}