import { useNavigate } from 'react-router-dom'
import S from './Bookmarks.module.css'

const dummyBookmarks = [
  {
    id: 1,
    title: '북마크된 글 1',
    content:
      'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
    date: '2023.07.28'
  },
  {
    id: 2,
    title: '북마크된 글 2',
    content:
      'Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet',
    date: '2023.07.29'
  }
]

const dummyLikedComments = [
  { id: 1, content: '좋아요한 댓글 1', date: '2023.07.28' },
  { id: 2, content: '좋아요한 댓글 2', date: '2023.07.29' },
  { id: 3, content: '좋아요한 댓글 3', date: '2023.07.30' }
]

export const Bookmarks = () => {
  const navigate = useNavigate()

  const handleBookmarkClick = (id: number) => {
    navigate(`/posts/${id}`)
  }

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>북마크한 글</h2>
        {dummyBookmarks.length === 0 ? (
          <p>북마크된 글이 없습니다.</p>
        ) : (
          dummyBookmarks.map((bookmark, idx) => (
            <div
              key={bookmark.id}
              className={S.item}
              onClick={() => handleBookmarkClick(bookmark.id)}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <div>
                  <p className={S.itemTitle}>{bookmark.title}</p>
                  <p className={S.itemContent}>{bookmark.content}</p>
                </div>
              </div>
              <div className={S.date}>{bookmark.date}</div>
            </div>
          ))
        )}
      </section>

      <section className={S.section}>
        <h2 className={S.title}>좋아요한 댓글</h2>
        {dummyLikedComments.length === 0 ? (
          <p>좋아요한 댓글이 없습니다.</p>
        ) : (
          dummyLikedComments.map((comment, idx) => (
            <div
              key={comment.id}
              className={S.item}>
              <div className={S.left}>
                <strong>{idx + 1}</strong>
                <p className={S.itemContent}>{comment.content}</p>
              </div>
              <div className={S.date}>{comment.date}</div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
