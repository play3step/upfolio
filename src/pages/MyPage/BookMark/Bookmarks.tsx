import { useNavigate } from 'react-router-dom'
import S from './Bookmarks.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/format'
import useBookmarks from '@/hooks/mypage/boomark/useBookmarks'

export const Bookmarks = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)
  const {
    bookmarks,
    loading: bookmarksLoading,
    error: bookmarksError
  } = useBookmarks(userId || '')

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

  const handleBookmarkClick = (id: string) => {
    navigate(`/portfolios/${id}`)
  }

  if (bookmarksLoading) return <p>로딩 중...</p>
  if (bookmarksError) return <p>북마크 오류 발생: {bookmarksError}</p>

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>북마크한 글</h2>
        {bookmarks.length === 0 ? (
          <p>북마크된 글이 없습니다.</p>
        ) : (
          bookmarks.map((bookmark, idx) => (
            <div
              key={bookmark.Portfolio.id}
              className={S.item}
              onClick={() => handleBookmarkClick(bookmark.Portfolio.id)}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <div>
                  <p className={S.itemTitle}>{bookmark.Portfolio.title}</p>
                  <p className={S.itemContent}>{bookmark.Portfolio.content}</p>
                </div>
              </div>
              <div className={S.date}>
                {formatDate(bookmark.Portfolio.createdAt)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
