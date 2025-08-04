import { fetchComments } from '@/apis/mypage/comment.controller'
import type { Comment } from '@/types/mypage'
import { useEffect, useState } from 'react'

export default function useComment(userId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const loadComment = async () => {
      try {
        setLoading(true)
        const data = await fetchComments(userId)
        setComments(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`댓글 데이터를 가져오는 중 오류 발생: ${err.message}`)
        } else {
          setError('댓글 데이터를 가져오는 중 알 수 없는 오류 발생')
        }
      } finally {
        setLoading(false)
      }
    }
    loadComment()
  }, [userId])

  return { comments, loading, error }
}
