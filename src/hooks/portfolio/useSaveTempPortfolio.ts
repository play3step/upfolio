import { uploadTempPortfolio } from '@/apis/portfolio/saveTemp.controller'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const useSaveTempPortfolio = ({
  portfolioData,
  userInfo
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
}) => {
  const handleSaveTemp = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await uploadTempPortfolio({ portfolioData, userInfo })
      alert('임시저장되었습니다.')
    } catch (error) {
      alert('임시저장에 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  return { handleSaveTemp }
}
