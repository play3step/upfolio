import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import S from './Posts.module.css'
import { formatDate } from '@/utils/format'

interface Comment {
  id: number
  portfolioid: number
  userid: string
  content: string
  createdat: string
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('Comment')
        .select('id, portfolioid, userid, content, createdat')
        .eq('userid', user.id)

      if (error) {
        console.error('댓글 목록을 가져오는 중 오류 발생:', error.message)
      } else {
        setComments(data || [])
      }
    }
    fetchComments()
  }, [])

  return (
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
            <div className={S.date}>{formatDate(comment.createdat)}</div>
          </div>
        ))
      )}
    </section>
  )
}
