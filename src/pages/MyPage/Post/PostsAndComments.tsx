import Comments from '@/pages/MyPage/Post/Comments'
import Posts from '@/pages/MyPage/Post/Posts'
import S from './Posts.module.css'

export default function PostsAndComments() {
  return (
    <div className={S.container}>
      <Posts />
      <Comments />
    </div>
  )
}
