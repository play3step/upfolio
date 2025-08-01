import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  if (!userInfo || !userInfo.id) {
    throw new Error('유저정보 없음')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = portfolioData

  const { data, error } = await supabase
    .from('Portfolio')
    .insert({
      ...rest,
      userId: userInfo.id,
      viewCount: 0
      // likeCount: 0
    })
    .select()
    .single()

  if (error) throw error

  return data.id
}
