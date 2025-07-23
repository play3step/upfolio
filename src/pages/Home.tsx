import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

export const Home = () => {
  const { portfolio, interest, career } = usePortfolio()
  const { authData } = useAuthLogin()

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
