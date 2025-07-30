import { uploadPortfolio } from '@/apis/portfolio/save.controller'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const useSavePortfolio = ({
  portfolioData,
  userInfo,
  validate
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
  validate: (data: PortfolioData) => boolean
}) => {
  const handleSave = async () => {
    if (!validate(portfolioData)) {
      alert('입력하지 않은 필수 항목이 있어요. 확인해주세요.')
      return
    }
    try {
      await uploadPortfolio({ portfolioData, userInfo })
      alert('포트폴리오가 저장되었습니다.')
    } catch (error) {
      alert('저장에 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  return { handleSave }
}
