import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark-empty.svg'
import bookmarkFilledIcon from '../assets/icon/bookmark-fill.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import redHeart from '../assets/icon/heart.fill.svg'
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
  onToggleLike: (id: string, next: boolean) => void
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
  onToggleBookmark,
  onToggleLike
}: PortfolioCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [liked, setLiked] = useState(false)
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)
  const navigate = useNavigate()

  useEffect(() => {
    // 새로고침 후 북마크 상태 반영
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  useEffect(() => {
    // 새로고침 후 좋아요 수 반영
    setCurrentLikeCount(likeCount)
  }, [likeCount])

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const next = !bookmarked
    setBookmarked(next)
    onToggleBookmark(id, next)
  }

  const toggleLike = () => {
    const next = !liked
    setLiked(next)
    onToggleLike(id, next)
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
          {liked ? (
            <img
              src={redHeart}
              alt="Like Icon"
              onClick={e => {
                e.stopPropagation()
                toggleLike()
              }}
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <img
              src={grayHeart}
              alt="Like Icon"
              style={{ pointerEvents: 'none' }}
            />
          )}
          {currentLikeCount}
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
