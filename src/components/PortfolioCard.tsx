import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import eye from '../assets/icon/eye.svg'

export interface Props {
  id: string
  userid: number
  title: string
  content: string
  likecount: number
  viewcount: number
  interest: string
  career: string
}

export function PortfolioCard({
  title,
  content,
  likecount,
  viewcount,
  interest,
  career
}: Props) {
  return (
    <div className={S.container}>
      <div className={S.interest}>{interest}</div>
      <button className={S.bookmark}>
        <img
          src={bookmarkIcon}
          alt="Bookmark Icon"
        />
      </button>

      <span className={S.career}> {career} </span>
      <h3 className={S.title}>{title}</h3>
      <span className={S.content}> {content}</span>
      <div className={S.meta}>
        <span className={S.like}>
          <img
            src={grayHeart}
            alt="Like Icon"
          />
          {likecount}
        </span>
        <span className={S.view}>
          <img
            src={eye}
            alt="View Icon"
          />
          {viewcount}
        </span>
      </div>
    </div>
  )
}
