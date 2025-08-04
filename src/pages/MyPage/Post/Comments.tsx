import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import S from './Posts.module.css'
import { formatDate } from '@/utils/format'
import { useNavigate } from 'react-router-dom'
import useComment from '@/hooks/mypage/posts/useComment'

export default function Comments() {
  const [userId, setUserId] = useState<string | null>(null)
  const navigate = useNavigate()

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

  const { comments, loading, error } = useComment(userId || '')

  if (!userId) return <p>사용자 정보를 불러오는 중...</p>
  if (loading) return <p>로딩 중...</p>
  if (error) return <p>오류 발생: {error}</p>

  const handleCommentsClick = (portfolioId: number) => {
    navigate(`/portfolios/${portfolioId}`)
  }

  return (
    <section className={S.section}>
      <h2 className={S.title}>내가 작성한 댓글</h2>
      {comments.length === 0 ? (
        <p>작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment, idx) => (
          <div
            key={comment.id}
            className={S.item}
            onClick={() => handleCommentsClick(comment.portfolioid)}>
            <div className={S.left}>
              <strong>{idx + 1}</strong>
              <p className={S.itemContent}>{comment.content}</p>
            </div>
            <div className={S.date}>{formatDate(comment.createdat)}</div>
          </div>
        ))
      )}
    </section>
  )
}
