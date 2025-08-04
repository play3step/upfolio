import { useEffect, useState } from 'react'
import { fetchPosts } from '@/apis/mypage/posts.controller'
import type { Post } from '@/types/mypage'

export const usePosts = (userId: string) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const loadPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchPosts(userId)
        setPosts(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`게시글 데이터를 가져오는 중 오류 발생: ${err.message}`)
        } else {
          setError('게시글 데이터를 가져오는 중 알 수 없는 오류 발생')
        }
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [userId])

  return { posts, loading, error }
}
