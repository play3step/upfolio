import { uploadPortfolio } from '@/apis/portfolio/save.controller'
import type { PortfolioData, UserInfo } from '@/types/portfolio'
import { alertError, alertSuccess } from '@/utils/alertUtils'
import { useNavigate } from 'react-router-dom'

export const useSavePortfolio = ({
  portfolioData,
  userInfo,
  tempPortfolioId,
  validate
}: {
  portfolioData: PortfolioData
  userInfo: UserInfo | null
  validate: (data: PortfolioData) => boolean
  tempPortfolioId: string
}) => {
  const navigate = useNavigate()
  const handleSave = async () => {
    if (!validate(portfolioData)) {
      alertError({
        title: '입력하지 않은 필수 항목이 있어요.',
        text: '다시 확인해주세요.'
      })
      return
    }

    try {
      const id = await uploadPortfolio({
        portfolioData,
        userInfo,
        tempPortfolioId
      })

      alertSuccess({ text: '포트폴리오가 저장되었습니다.' })
      navigate(`/portfolios/${id}`)
    } catch (error) {
      alertError({
        title: '포트폴리오 저장 실패',
        text: '다시 시도해주세요.'
      })
      console.error(error)
    }
  }

  return { handleSave }
}
