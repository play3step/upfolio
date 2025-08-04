import { fetchBookmarks } from '@/apis/mypage/bookmarks.controller'
import type { BookmarkAndLiked } from '@/types/mypage'
import { useEffect, useState } from 'react'

export default function useBookmarks(userId: string) {
  const [bookmarks, setBookmarks] = useState<BookmarkAndLiked[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    const loadbookmarks = async () => {
      try {
        setLoading(true)
        const data = await fetchBookmarks(userId)
        setBookmarks(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`북마크한 글 데이터를 가져오는 중 오류 발생: ${err.message}`)
        } else {
          setError('북마크한 글 데이터를 가져오는 중 알 수 없는 오류 발생')
        }
      } finally {
        setLoading(false)
      }
    }
    loadbookmarks()
  }, [userId])
  return { bookmarks, loading, error }
}
