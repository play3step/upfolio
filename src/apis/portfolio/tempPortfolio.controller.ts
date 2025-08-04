import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'
import { omit } from 'lodash'

/* --- 임시저장 저장/수정 --- */
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

/* --- 임시저장 리스트 조회 --- */
export const fetchTempPortfolioList = async (userId: string) => {
  const { data, error } = await supabase
    .from('TempPortfolio')
    .select('id,title,createdAt')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })

  if (error) throw error

  return data ?? []
}

/* --- 임시저장 아이템 조회 --- */
export const fetchTempPortfolioItem = async (id: string) => {
  const { data, error } = await supabase
    .from('TempPortfolio')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error

  return data ?? null
}

/* --- 임시저장 아이템 삭제 --- */
export const deleteTempPortfolioItem = async (id: string) => {
  const { error } = await supabase.from('TempPortfolio').delete().eq('id', id)
  if (error) throw error
}
