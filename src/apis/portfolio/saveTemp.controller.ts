import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadTempPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { viewCount, likeCount, ...rest } = portfolioData

  const { error } = await supabase
    .from('TempPortfolio')
    .upsert(
      {
        ...rest,
        userId: userInfo?.id,
        ...(portfolioData.id ? { id: portfolioData.id } : {})
      },
      { onConflict: 'id' }
    )

  if (error) throw error
}
