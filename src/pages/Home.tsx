import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { PortfolioCard, type Props } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'

export const Home = () => {
  const [portfolio, setPortfolio] = useState<Props[]>([])
  const [interest, setInterest] = useState('');
  const [career, setCareer] = useState('');

  useEffect(() => {
    const fetchInterestAndCareer = async (userid: number) => {
      const { data, error } = await supabase
        .from('User')
        .select('interest, career')
        .eq('id', userid)
        .single()

      if (error) {
        console.error('Error fetching interest and career:', error)
      } else {
        setInterest(data?.interest || '');
        setCareer(data?.career || '');
      }
    }

    const fetchPortfolio = async () => {
      const { data: portfolios, error } = await supabase
        .from('Portfolio')
        .select('id, title, content, likecount, viewcount, userid');
    
      if (error) {
        console.error('Error fetching portfolio:', error);
      } else {
        if (portfolios && portfolios.length > 0) {
          const portfoliosWithInterest = portfolios.map(portfolio => ({
            ...portfolio,
            interest: '', // interest 필드 초기화
          }));
          setPortfolio(portfoliosWithInterest as Props[]);
    
          const firstUserId = portfolios[0]?.userid;
          if (firstUserId) {
            fetchInterestAndCareer(firstUserId);
          } else {
            console.warn('userId is missing from portfolio');
          }
        }
      }
    };

    fetchPortfolio()
  }, [])

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
