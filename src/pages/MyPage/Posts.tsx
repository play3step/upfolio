import { useNavigate } from 'react-router-dom'
import S from './Posts.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

interface Post {
  id: number
  title: string
  content: string
  createdat: string
  likeCount: number
  viewCount: number
}

interface Comment {
  id: number
  portfolioid: number
  userid: string
  content: string
  createdat: string
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('Portfolio')
        .select('id, title, content, createdat, likeCount,viewCount')
        .eq('userId', user.id)

      setPosts(data || [])

      const { data: commentData } = await supabase
        .from('Comment')
        .select('id, portfolioid, userid, content, createdat')
        .eq('userid', user.id)

      setComments(commentData || [])
    }
    fetchPosts()
  }, [])

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`)
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
              <div className={S.date}>
                {new Date(post.createdat)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                  .replace(/\.\s*$/, '')}
                | 좋아요: {post.likeCount} | 조회수: {post.viewCount}
              </div>
            </div>
          ))
        )}
      </section>

      <section className={S.section}>
        <h2 className={S.title}>내가 작성한 댓글</h2>
        {comments.length === 0 ? (
          <p>작성된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment, idx) => (
            <div
              key={comment.id}
              className={S.item}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <p className={S.itemContent}>{comment.content}</p>
              </div>
              <div className={S.date}>
                {new Date(comment.createdat)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                  .replace(/\.\s*$/, '')}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
