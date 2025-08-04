import supabase from '@/lib/supabaseClient'
import type { PortfolioData, UserInfo } from '@/types/portfolio'
import { omit } from 'lodash'

type InsertPortfolioData = Omit<
  PortfolioData,
  'id' | 'viewCount' | 'createdAt' | 'userId'
>

export const uploadPortfolio = async ({
  portfolioData,
  userInfo,
  tempPortfolioId
}: {
  portfolioData: InsertPortfolioData
  userInfo: UserInfo | null
  tempPortfolioId: string
}) => {
  if (!userInfo || !userInfo.id) {
    throw new Error('유저정보 없음')
  }

  const filteredData = omit(portfolioData, [
    'id',
    'viewCount',
    'createdAt',
    'userId'
  ]) as InsertPortfolioData

  const { data, error } = await supabase
    .from('Portfolio')
    .insert({
      ...filteredData,
      userId: userInfo.id,
      viewCount: 0,
      createdAt: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error

  // 임시저장한 글 저장 시 TempPortfolio 삭제
  if (tempPortfolioId && tempPortfolioId.trim() !== '') {
    const { error } = await supabase
      .from('TempPortfolio')
      .delete()
      .eq('id', tempPortfolioId)

    if (error) {
      console.error('임시저장 삭제 실패', error)
    }
  }

  return data.id
}
