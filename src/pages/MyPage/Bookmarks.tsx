import { useNavigate } from 'react-router-dom'
import S from './Bookmarks.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/format'

interface BookmarkAndLiked {
  portfolioid: string
  Portfolio: {
    id: string
    title: string
    content: string
    createdAt: string
    likeCount: number
  }
}

export const Bookmarks = () => {
  const navigate = useNavigate()
  const [bookmarks, setBookmarks] = useState<BookmarkAndLiked[]>([])
  const [likedComments, setLikedComments] = useState<BookmarkAndLiked[]>([])

  useEffect(() => {
    const fetchBookmarks = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error('사용자 인증 정보가 없습니다.')
        return
      }

      // 북마크 데이터 가져오기
      const { data: bookmarkData, error: bookmarkError } = await supabase
        .from('BookMark')
        .select(
          `
          portfolioid,
          PortfolioWithLikes(
            id,
            title,
            content,
            createdAt,
            likeCount
          )
        `
        )
        .eq('userid', user.id)

      if (bookmarkError) {
        console.error(
          '북마크 데이터를 가져오는 중 오류 발생:',
          bookmarkError.message
        )
      } else if (bookmarkData) {
        const fixedBookmarks: BookmarkAndLiked[] = bookmarkData.map(item => {
          const bookmark = Array.isArray(item.PortfolioWithLikes)
            ? item.PortfolioWithLikes[0] // 배열이면 첫 번째 값
            : item.PortfolioWithLikes // 아니면 그냥 사용

          return {
            portfolioid: item.portfolioid,
            Portfolio: {
              id: bookmark.id,
              title: bookmark.title,
              content: bookmark.content,
              createdAt: bookmark.createdAt,
              likeCount: bookmark.likeCount
            }
          }
        })

        fixedBookmarks.sort(
          (a, b) =>
            new Date(b.Portfolio.createdAt).getTime() -
            new Date(a.Portfolio.createdAt).getTime()
        )

        setBookmarks(fixedBookmarks)
      }

      // 좋아요한 댓글 데이터 가져오기
      const { data: likedCommentData, error: likedCommentError } =
        await supabase
          .from('like_table')
          .select(
            `
          portfolioid,
          PortfolioWithLikes(
            id,
            title,
            content,
            createdAt,
            likeCount
          )
        `
          )
          .eq('userid', user.id)

      if (likedCommentError) {
        console.error(
          '좋아요한 글 데이터를 가져오는 중 오류 발생:',
          likedCommentError.message
        )
      } else if (likedCommentData) {
        const fixedLikedPortfolios: BookmarkAndLiked[] = likedCommentData.map(
          item => {
            const likedPortfolio = Array.isArray(item.PortfolioWithLikes)
              ? item.PortfolioWithLikes[0]
              : item.PortfolioWithLikes

            return {
              portfolioid: item.portfolioid,
              Portfolio: {
                id: likedPortfolio.id,
                title: likedPortfolio.title,
                content: likedPortfolio.content,
                createdAt: likedPortfolio.createdAt,
                likeCount: likedPortfolio.likeCount
              }
            }
          }
        )

        fixedLikedPortfolios.sort(
          (a, b) => b.Portfolio.likeCount - a.Portfolio.likeCount
        )

        setLikedComments(fixedLikedPortfolios)
      }
    }

    fetchBookmarks()
  }, [])

  const handleBookmarkClick = (id: string) => {
    navigate(`/portfolios/${id}`)
  }

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

      <section className={S.section}>
        <h2 className={S.title}>좋아요한 글</h2>
        {likedComments.length === 0 ? (
          <p>좋아요한 글이 없습니다.</p>
        ) : (
          likedComments.map((likeportfolio, idx) => (
            <div
              key={likeportfolio.portfolioid}
              className={S.item}
              onClick={() => handleBookmarkClick(likeportfolio.Portfolio.id)}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <div className={S.itemContent}>
                  <p className={S.itemTitle}>{likeportfolio.Portfolio.title}</p>
                  <p>{likeportfolio.Portfolio.content}</p>
                </div>
              </div>
              <div className={S.date}>
                {formatDate(likeportfolio.Portfolio.createdAt)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
