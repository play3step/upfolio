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
  const { viewCount, id: _id, userId: _userId, ...rest } = portfolioData

  const safeId = _id?.trim?.()
  const safeUserId = userInfo?.id?.trim?.()

  const { data, error } = await supabase
    .from('TempPortfolio')
    .upsert(
      {
        ...rest,
        ...(safeId ? { id: safeId } : {}),
        ...(safeUserId ? { userId: safeUserId } : {}),
        createdAt: new Date().toISOString()
      },
      { onConflict: 'id' }
    )
    .select()
    .single()

  if (error) throw error

  return data.id
}
