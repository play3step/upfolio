import { useNavigate } from 'react-router-dom'
import S from './Bookmarks.module.css'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { formatDate } from '@/utils/formatDate'

interface Bookmark {
  portfolioid: string
  Portfolio: {
    id: string
    title: string
    content: string
    createdAt: string
    likeCount: number
  }
}

interface LikedComment {
  commentid: string
  Comment: {
    content: string
    createdAt: string
  }
}

export const Bookmarks = () => {
  const navigate = useNavigate()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [likedComments, setLikedComments] = useState<LikedComment[]>([])

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
          Portfolio(
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
        const fixedBookmarks: Bookmark[] = bookmarkData.map(item => {
          const portfolio = Array.isArray(item.Portfolio)
            ? item.Portfolio[0] // 배열이면 첫 번째 값
            : item.Portfolio // 아니면 그냥 사용

          return {
            portfolioid: item.portfolioid,
            Portfolio: {
              id: portfolio.id,
              title: portfolio.title,
              content: portfolio.content,
              createdAt: portfolio.createdAt,
              likeCount: portfolio.likeCount
            }
          }
        })

        setBookmarks(fixedBookmarks)
      }

      // 좋아요한 댓글 데이터 가져오기
      const { data: likedCommentData, error: likedCommentError } =
        await supabase
          .from('Like')
          .select(
            `
          commentid,
          Comment (
            content,
            createdAt
          )
        `
          )
          .eq('userid', user.id)

      if (likedCommentError) {
        console.error(
          '좋아요한 댓글 데이터를 가져오는 중 오류 발생:',
          likedCommentError.message
        )
      } else if (likedCommentData) {
        const fixedLikedComments: LikedComment[] = likedCommentData.map(
          item => {
            const comment = Array.isArray(item.Comment)
              ? item.Comment[0]
              : item.Comment

            return {
              commentid: item.commentid,
              Comment: {
                content: comment.content,
                createdAt: comment.createdAt
              }
            }
          }
        )

        setLikedComments(fixedLikedComments)
      }
    }

    fetchBookmarks()
  }, [])

  const handleBookmarkClick = (id: string) => {
    navigate(`/bookmarks/${id}`)
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
        <h2 className={S.title}>좋아요한 댓글</h2>
        {likedComments.length === 0 ? (
          <p>좋아요한 댓글이 없습니다.</p>
        ) : (
          likedComments.map((comment, idx) => (
            <div
              key={comment.commentid}
              className={S.item}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <p className={S.itemContent}>{comment.Comment.content}</p>
              </div>
              <div className={S.date}>
                {formatDate(comment.Comment.createdAt)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
