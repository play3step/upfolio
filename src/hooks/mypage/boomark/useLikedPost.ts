import { fetchLikedPosts } from '@/apis/mypage/likedposts.controller'
import type { BookmarkAndLiked } from '@/types/mypage'
import { useEffect, useState } from 'react'

export default function useLikedPost(userId: string) {
  const [likedPosts, setLikedPosts] = useState<BookmarkAndLiked[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    const loadLikedPosts = async () => {
      try {
        setLoading(true)
        const data = await fetchLikedPosts(userId)
        setLikedPosts(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`좋아요한 글 데이터를 가져오는 중 오류 발생: ${err.message}`)
        } else {
          setError('좋아요한 글 데이터를 가져오는 중 알 수 없는 오류 발생')
        }
      } finally {
        setLoading(false)
      }
    }
    loadLikedPosts()
  }, [userId])
  return { likedPosts, loading, error }
}
