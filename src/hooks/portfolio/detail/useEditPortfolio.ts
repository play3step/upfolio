import { updatePortfolio } from '@/apis/portfolio/portfolio.controller'
import { type PortfolioData } from '@/types/portfolio'
import { useNavigate } from 'react-router-dom'

export const useEditPortfolio = (portfolioData: PortfolioData) => {
  const nav = useNavigate()
  const handleEditPortfolio = async () => {
    await updatePortfolio(portfolioData)
    alert('포트폴리오가 수정되었습니다.')
    nav(`/portfolios/${portfolioData.id}`, { replace: true })
  }

  return { handleEditPortfolio }
}
