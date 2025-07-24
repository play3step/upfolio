import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark-empty.svg'
import bookmarkFilledIcon from '../assets/icon/bookmark-fill.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import eye from '../assets/icon/eye.svg'
import { useState, useEffect } from 'react'

export interface Props {
  id: string
  userid: number
  title: string
  content: string
  likecount: number
  viewcount: number
  interest: string
  career: string
  isBookmarked: boolean
}

interface PortfolioCardProps extends Props {
  onToggleBookmark: (id: string, next: boolean) => void
}

export function PortfolioCard({
  id,
  title,
  content,
  likecount,
  viewcount,
  interest,
  career,
  isBookmarked,
  onToggleBookmark,
}: PortfolioCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)

  useEffect(() => {
    // 새로고침 후 북마크 상태 반영
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  const toggleBookmark = () => {
    const next = !bookmarked
    setBookmarked(next)
    onToggleBookmark(id, next)
  }

  return (
    <div className={S.container}>
      <div className={S.interest}>{interest}</div>

      <button onClick={toggleBookmark} className={S.bookmark}>
        <img
          src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
          alt="bookmark icon"
        />
      </button>

      <span className={S.career}>{career}</span>
      <h3 className={S.title}>{title}</h3>
      <span className={S.content}>{content}</span>

      <div className={S.meta}>
        <span className={S.like}>
          <img src={grayHeart} alt="Like Icon" />
          {likecount}
        </span>
        <span className={S.view}>
          <img src={eye} alt="View Icon" />
          {viewcount}
        </span>
      </div>
    </div>
  )
}
