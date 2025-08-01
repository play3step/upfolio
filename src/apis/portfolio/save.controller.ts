import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
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

  if (error) throw error

  return data.id
}
