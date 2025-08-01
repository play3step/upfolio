import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
<<<<<<< HEAD
  const { error } = await supabase.from('Portfolio').insert({
    ...portfolioData,
    userId: userInfo?.id,
    id: undefined,
    viewCount: 0
  })
=======
  const { data, error } = await supabase
    .from('Portfolio')
    .insert({
      ...portfolioData,
      userId: userInfo?.id,
      viewCount: 0
      // likeCount: 0
    })
    .select()
    .single()
>>>>>>> main

  if (error) throw error

  return data.id
}
