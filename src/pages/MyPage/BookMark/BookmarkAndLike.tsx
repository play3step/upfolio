import { Bookmarks } from '@/pages/MyPage/BookMark/Bookmarks'
import { LikePost } from '@/pages/MyPage/BookMark/LikePost'
import S from './Bookmarks.module.css'

function index() {
  return (
    <div className={S.container}>
      <Bookmarks />
      <LikePost />
    </div>
  )
}
export default index
