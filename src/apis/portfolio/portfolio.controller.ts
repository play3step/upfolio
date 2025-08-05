import supabase from '@/lib/supabaseClient'
import type { PortfolioData } from '@/types/portfolio'

export const getPortfolio = async (
  portfolioId: string
): Promise<PortfolioData> => {
  const { data, error } = await supabase
    .from('Portfolio')
    .select('*')
    .eq('id', portfolioId)
    .single()

  if (error) {
    console.error('포트폴리오 데이터를 불러오는 중 오류 발생: ', error)
  }
  return data
}

export const viewCountPortfolio = async (
  portfolioId: string,
  viewCount: number
) => {
  const { error: updateError } = await supabase
    .from('Portfolio')
    .update({
      viewCount: viewCount + 1
    })
    .eq('id', portfolioId)
    .select()

  if (updateError) {
    console.error('포트폴리오 뷰 카운트 업데이트 중 오류 발생: ', updateError)
    return
  }
}

export const getLikeStatus = async (
  portfolioId: string,
  userId: string
): Promise<boolean> => {
  const { data: likeData, error: likeError } = await supabase
    .from('like_table')
    .select('*', { count: 'exact' })
    .eq('portfolioid', portfolioId)
    .eq('userid', userId)
    .maybeSingle()

  if (likeError && likeError.code !== 'PGRST116') {
    console.error('좋아요 상태를 불러오는 중 오류 발생: ', likeError)
  }

  return likeData
}

export const getLikeCount = async (portfolioId: string) => {
  const { data, error: countError } = await supabase
    .from('PortfolioWithLikes')
    .select('likeCount')
    .eq('id', portfolioId)
    .single()

  if (countError) {
    console.error('좋아요 개수를 불러오는 중 오류 발생: ', countError)
  }

  return data?.likeCount ?? 0
}

export const updatePortfolio = async (portfolioData: PortfolioData) => {
  const { data, error } = await supabase
    .from('Portfolio')
    .update(portfolioData)
    .eq('id', portfolioData.id)
  if (error) {
    console.error(error)
  }

  return data
}
