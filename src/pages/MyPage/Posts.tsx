import { useNavigate } from 'react-router-dom'
import S from './Posts.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/formatDate'
import Comments from './Comments'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  likeCount: number
  viewCount: number
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        // .from('Portfolio')
        .from('PortfolioWithLikes')
        .select('id, title, content, createdAt, likeCount,viewCount')
        .eq('userId', user.id)

      setPosts(data || [])
    }
    fetchPosts()
  }, [])

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
      <Comments />
    </div>
  )
}
