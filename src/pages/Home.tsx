import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { useEffect } from 'react'

export const Home = () => {
  const { portfolio, interest, career } = usePortfolio()
  const { authData, getSession } = useAuthLogin()

  useEffect(() => {
    getSession()
  }, [])

  console.log(authData)

  return (
    <div className={styles['portfolio-grid']}>
      {portfolio.map(portfolioItem => (
        <PortfolioCard
          key={portfolioItem.id}
          id={portfolioItem.id}
          userid={portfolioItem.userid}
          interest={interest}
          career={career}
          title={portfolioItem.title}
          content={portfolioItem.content}
          likecount={portfolioItem.likecount}
          viewcount={portfolioItem.viewcount}
        />
      ))}
    </div>
  )
}
