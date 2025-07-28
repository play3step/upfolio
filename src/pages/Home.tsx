import { useEffect, useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'
import { PortfolioCard } from '@/components/PortfolioCard'
import styles from '@/components/PortfolioCard.module.css'
import supabase from '@/lib/supabaseClient'
import { SearchBar } from '@/components/SearchBar'

export const Home = () => {
  const { authData, getSession } = useAuthLogin()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    getSession()
  }, [])

  useEffect(() => {
    if (authData?.id) {
      setUserId(authData.id)
    }
  }, [authData])

  const { portfolio, setPortfolio } = usePortfolio(userId)

  const handleToggleBookmark = async (id: string, next: boolean) => {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    const userId = user?.id
    console.log(user?.id)

    if (!userId) {
      console.error('User not authenticated')
      return
    }

    if (next) {
      // 북마크 추가
      const { error } = await supabase
        .from('BookMark')
        .upsert({ portfolioid: id, userid: userId })

      if (error) {
        console.error('Error adding bookmark:', error.message)
        return
      }
    } else {
      // 북마크 제거
      const { error } = await supabase
        .from('BookMark')
        .delete()
        .eq('userid', userId)
        .eq('portfolioid', id)

      if (error) {
        console.error('Error removing bookmark:', error.message)
        return
      }
    }

    // UI 상태 동기화
    setPortfolio(prev =>
      prev.map(p => (p.id === id ? { ...p, isBookmarked: next } : p))
    )
  }

  return (
    <div>
      <SearchBar />
      <div className={styles['portfolio-grid']}>
        {portfolio?.map(p => (
          <PortfolioCard
            key={p.id}
            {...p}
            onToggleBookmark={handleToggleBookmark}
          />
        ))}
      </div>
    </div>
  )
}
