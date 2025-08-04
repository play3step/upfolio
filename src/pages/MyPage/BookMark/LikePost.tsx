import useLikedPost from '@/hooks/mypage/boomark/useLikedPost'
import S from './Bookmarks.module.css'
import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/format'
import { useNavigate } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'

export function LikePost() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('사용자 인증 정보가 없습니다.')
        return
      }
      setUserId(user.id)
    }

    fetchUser()
  }, [])

  const {
    likedPosts,
    loading: likedPostsLoading,
    error: likedPostsError
  } = useLikedPost(userId || '')

  if (likedPostsLoading) return <p>로딩 중...</p>
  if (likedPostsError) return <p>좋아요한 글 오류 발생: {likedPostsError}</p>

  const handleLikeClick = (id: string) => {
    navigate(`/portfolios/${id}`)
  }

  return (
    <section className={S.section}>
      <h2 className={S.title}>좋아요한 글</h2>
      {likedPosts.length === 0 ? (
        <p>좋아요한 글이 없습니다.</p>
      ) : (
        likedPosts.map((likeportfolio, idx) => (
          <div
            key={likeportfolio.portfolioid}
            className={S.item}
            onClick={() => handleLikeClick(likeportfolio.Portfolio.id)}>
            <div className={S.left}>
              <strong>{idx + 1}</strong>
              <div>
                <p className={S.itemTitle}>{likeportfolio.Portfolio.title}</p>
                <p className={S.itemContent}>
                  {likeportfolio.Portfolio.content}
                </p>
              </div>
            </div>
            <div className={S.date}>
              {formatDate(likeportfolio.Portfolio.createdAt)}
            </div>
          </div>
        ))
      )}
    </section>
  )
}
