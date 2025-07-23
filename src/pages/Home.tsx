import { PortfolioCard } from '@/components/PortfolioCard';
import styles from '@/components/PortfolioCard.module.css';
import { usePortfolio } from '@/hooks/usePortfolio';

export const Home = () => {
  const { portfolio, interest, career } = usePortfolio();

  return (
    <div className={styles['portfolio-grid']}>
      {portfolio.map((portfolioItem) => (
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
  );
};
