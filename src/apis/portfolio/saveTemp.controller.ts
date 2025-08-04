import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'
import { omit } from 'lodash'

export const uploadTempPortfolio = async ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  const omitFields = ['viewCount', 'id', 'userId']
  const saveTempData = omit(portfolioData, omitFields)
  const safeId = portfolioData.id?.trim?.()
  const safeUserId = userInfo?.id?.trim?.()

  const { data, error } = await supabase
    .from('TempPortfolio')
    .upsert(
      {
        ...saveTempData,
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
