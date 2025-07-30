import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  const { error } = await supabase.from('Portfolio').insert({
    ...portfolioData,
    userId: userInfo?.id,
    id: undefined,
    viewCount: 0,
    likeCount: 0
  })

  if (error) throw error
}
