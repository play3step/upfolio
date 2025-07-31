/* eslint-disable @typescript-eslint/no-unused-vars */
import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const uploadTempPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  const {
    viewCount,
    likeCount,
    id: _id,
    userId: _userId,
    ...rest
  } = portfolioData

  const safeId = _id?.trim?.()
  const safeUserId = userInfo?.id?.trim?.()

  const { error } = await supabase.from('TempPortfolio').upsert(
    {
      ...rest,
      ...(safeId ? { id: safeId } : {}),
      ...(safeUserId ? { userId: safeUserId } : {})
    },
    { onConflict: 'id' }
  )

  if (error) throw error
}
