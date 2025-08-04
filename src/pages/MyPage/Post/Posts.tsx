import { useNavigate } from 'react-router-dom'
import S from './Posts.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/format'
import { usePosts } from '@/hooks/mypage/posts/usePosts'

export default function Posts() {
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

  const { posts, loading, error } = usePosts(userId || '')

  if (!userId) return <p>사용자 정보를 불러오는 중...</p>
  if (loading) return <p>로딩 중...</p>
  if (error) return <p>오류 발생: {error}</p>

  const handlePostClick = (id: number) => {
    navigate(`/portfolios/${id}`)
  }

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>내가 작성한 글</h2>
        {posts.length === 0 ? (
          <p>작성된 글이 없습니다.</p>
        ) : (
          posts.map((post, idx) => (
            <div
              key={post.id}
              className={S.item}
              onClick={() => handlePostClick(post.id)}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <div>
                  <p className={S.itemTitle}>{post.title}</p>
                  <p className={S.itemContent}>{post.content}</p>
                </div>
              </div>
              <div className={S.date}>{formatDate(post.createdAt)}</div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
