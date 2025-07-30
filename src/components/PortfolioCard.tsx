import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark-empty.svg'
import bookmarkFilledIcon from '../assets/icon/bookmark-fill.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import eye from '../assets/icon/eye.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface Props {
  id: string
  userId: string
  title: string
  content: string
  likeCount: number
  viewCount: number
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
  likeCount,
  viewCount,
  interest,
  career,
  isBookmarked,
  onToggleBookmark
}: PortfolioCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const navigate = useNavigate()

  useEffect(() => {
    // 새로고침 후 북마크 상태 반영
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const next = !bookmarked
    setBookmarked(next)
    onToggleBookmark(id, next)
  }

  const handleCardClick = () => {
    navigate(`/portfolios/${id}`)
  }

  return (
    <div
      className={S.container}
      onClick={handleCardClick}>
      <div className={S.interest}>{interest}</div>

      <button
        onClick={toggleBookmark}
        className={S.bookmark}>
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
          <img
            src={grayHeart}
            alt="Like Icon"
          />
          {likeCount}
        </span>
        <span className={S.view}>
          <img
            src={eye}
            alt="View Icon"
          />
          {viewCount}
        </span>
      </div>
    </div>
  )
}
