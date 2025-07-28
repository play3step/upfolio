import { useNavigate } from 'react-router-dom'
import S from './Posts.module.css'

const dummyPosts = [
  {
    id: 1,
    title: '타이틀 1',
    content: 'Lorem ipsum dolor sit amet...',
    date: '2023.07.28'
  },
  {
    id: 2,
    title: '타이틀 2',
    content: 'Lorem ipsum dolor sit amet...',
    date: '2023.07.29'
  }
]

const dummyComments = [
  { id: 1, content: 'Lorem ipsum dolor sit amet...', date: '2023.07.28' },
  { id: 2, content: 'Lorem ipsum dolor sit amet...', date: '2023.07.29' },
  { id: 3, content: 'Lorem ipsum dolor sit amet...', date: '2023.07.30' }
]

export default function Posts() {
  const navigate = useNavigate()

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`)
  }

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>내가 작성한 글</h2>
        {dummyPosts.length === 0 ? (
          <p>작성된 글이 없습니다.</p>
        ) : (
          dummyPosts.map((post, idx) => (
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
              <div className={S.date}>{post.date}</div>
            </div>
          ))
        )}
      </section>

      <section className={S.section}>
        <h2 className={S.title}>내가 작성한 댓글</h2>
        {dummyComments.length === 0 ? (
          <p>작성된 댓글이 없습니다.</p>
        ) : (
          dummyComments.map((comment, idx) => (
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
