// src/hooks/usePortfolio.ts
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { type Props } from '@/components/PortfolioCard';

interface UsePortfolioResult {
  portfolio: Props[];
  interest: string;
  career: string;
}

export const usePortfolio = (): UsePortfolioResult => {
  const [portfolio, setPortfolio] = useState<Props[]>([]);
  const [interest, setInterest] = useState('');
  const [career, setCareer] = useState('');

  useEffect(() => {
    const fetchInterestAndCareer = async (userid: string) => {
      const { data, error } = await supabase
        .from('User')
        .select('interest, career')
        .eq('id', userid)
        .single();

      if (error) {
        console.error('Error fetching interest and career:', error);
      } else {
        setInterest(data?.interest || '');
        setCareer(data?.career || '');
      }
    };

    const fetchPortfolio = async () => {
      const { data: portfolios, error } = await supabase
        .from('Portfolio')
        .select('id, title, content, likecount, viewcount, userid');

      if (error) {
        console.error('Error fetching portfolio:', error);
      } else {
        if (portfolios && portfolios.length > 0) {
          setPortfolio(portfolios as Props[]);

          const firstUserId = portfolios[0]?.userid;
          if (firstUserId) {
            fetchInterestAndCareer(firstUserId);
          } else {
            console.warn('userId is missing from portfolio');
          }
        }
      }
    };

    fetchPortfolio();
  }, []);

  return { portfolio, interest, career };
};
