import { uploadTempPortfolio } from '@/apis/portfolio/saveTemp.controller'
import type { PortfolioData, UserInfo } from '@/types/portfolio'

export const useSaveTempPortfolio = ({
  portfolioData,
  userInfo,
  onSave,
  setTempPortfolioId
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
  onSave?: () => void
  setTempPortfolioId?: (id: string) => void
}) => {
  const handleSaveTemp = async () => {
    try {
      const tempData = {
        ...portfolioData,
        title:
          portfolioData.title.trim() === '' ? '제목없음' : portfolioData.title
      }
      const id = await uploadTempPortfolio({
        portfolioData: tempData,
        userInfo
      })
      alert('임시저장되었습니다.')

      if (setTempPortfolioId) {
        setTempPortfolioId(id)
      }
      if (onSave) {
        onSave()
      }
    } catch (error) {
      alert('임시저장에 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  return { handleSaveTemp }
}
