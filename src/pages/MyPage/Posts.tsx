import { useNavigate } from 'react-router-dom'
import S from './Posts.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/formatDate'
import likeIcon from '@/assets/icon/like.svg'
import eyeIcon from '@/assets/icon/eye.svg'
import Comments from './Comments'

interface Post {
  id: number
  title: string
  content: string
  createdat: string
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
        .from('Portfolio')
        .select('id, title, content, createdat, likeCount,viewCount')
        .eq('userId', user.id)

      setPosts(data || [])
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
                {formatDate(post.createdat)} |{' '}
                <span className={S.inline}>
                  <img
                    src={likeIcon}
                    alt="like"
                  />
                  {post.likeCount}
                </span>{' '}
                |{' '}
                <span className={S.inline}>
                  <img
                    src={eyeIcon}
                    alt="eye"
                  />
                  {post.viewCount}
                </span>
              </div>
            </div>
          ))
        )}
      </section>
      <Comments />
    </div>
  )
}
