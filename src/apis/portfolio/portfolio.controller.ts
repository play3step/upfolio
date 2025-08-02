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
