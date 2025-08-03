import S from './PortfolioCard.module.css'
import bookmarkIcon from '../assets/icon/bookmark-empty.svg'
import bookmarkFilledIcon from '../assets/icon/bookmark-fill.svg'
import grayHeart from '../assets/icon/grayHeart.svg'
import redHeart from '../assets/icon/heart.fill.svg'
import eye from '../assets/icon/eye.svg'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth/useAuth'

export interface Props {
  portfolioid: string
  userId: string
  name: string
  title: string
  content: string
  likeCount: number
  viewCount: number
  interest: { label: string; value: string } | string
  career: { label: string; value: string } | string
  isBookmarked: boolean
}

interface PortfolioCardProps extends Props {
  onToggleBookmark: (portfolioid: string, next: boolean) => void
  onToggleLike: (portfolioid: string, next: boolean) => void
  isMine: boolean
}

export function PortfolioCard({
  userId,
  portfolioid,
  title,
  name,
  content,
  likeCount,
  viewCount,
  interest,
  career,
  isBookmarked,
  onToggleBookmark,
  onToggleLike,
  isMine
}: PortfolioCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [liked, setLiked] = useState(false)
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)
  const navigate = useNavigate()
  const { authData } = useAuth()

  let parsedInterest = { label: '', value: '' }
  let parsedCareer = { label: '', value: '' }

  try {
    parsedInterest =
      typeof interest === 'string' && interest
        ? JSON.parse(interest)
        : (interest as { label: string; value: string })
  } catch (e) {
    console.error('interest 파싱 에러:', interest, e)
  }

  try {
    parsedCareer =
      typeof career === 'string' && career
        ? JSON.parse(career)
        : (career as { label: string; value: string })
  } catch (e) {
    console.error('career 파싱 에러:', career, e)
  }

  useEffect(() => {
    setBookmarked(isBookmarked)
  }, [isBookmarked])

  useEffect(() => {
    setCurrentLikeCount(likeCount)
  }, [likeCount])

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!authData) {
      alert('로그인이 필요합니다.')
      return
    }
    const next = !bookmarked
    setBookmarked(next)
    onToggleBookmark(portfolioid, next)
  }

  const toggleLike = () => {
    const next = !liked
    setLiked(next)
    setCurrentLikeCount(prev => prev + (next ? 1 : -1))
    onToggleLike(portfolioid, next)
  }

  const handleCardClick = () => {
    navigate(`/portfolios/${portfolioid}`)
  }

  const getInterestClass = (
    interest: string | { label: string; value: string }
  ) => {
    switch (parsedInterest.label) {
      case '프론트엔드 개발':
        return S.frontend
      case '백엔드 개발':
        return S.backend
      case '풀스택 개발':
        return S.fullstack
      case '모바일 개발':
        return S.mobile
      case '임베디드 개발':
        return S.embedded
      case 'UI/UX 디자인':
        return S.uiux
      case '그래픽 디자인':
        return S.graphic
      case '모션 디자인':
        return S.motion
      case '일러스트':
        return S.illustration
      default:
        return ''
    }
  }

  return (
    <div
      className={S.container}
      onClick={handleCardClick}>
      <div className={`${S.interest} ${getInterestClass(interest)}`}>
        {typeof interest === 'string'
          ? interest
          : parsedInterest.label || '지원분야 미지정'}
      </div>

      <button
        onClick={e => {
          e.stopPropagation()
          console.log('userid: ', userId)
          if (!userId) {
            alert('로그인이 필요합니다.')
            return
          }
          toggleBookmark(e)
        }}
        className={S.bookmark}>
        <img
          src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
          alt="bookmark icon"
        />
      </button>

      <span className={S.career}>{parsedCareer?.label || '경력 미지정'}</span>
      <h3 className={S.title}>{title}</h3>
      <span className={S.content}>{content}</span>

      <div className={S.footer}>
        <div className={S.userInfo}>
          <div className={S.userIdContainer}>
            <span className={S.userId}>{name}</span>
            {isMine && <span className={S.myBadge}>내 포트폴리오</span>}
          </div>
          <div className={S.meta}>
            <span className={S.like}>
              <img
                src={liked ? redHeart : grayHeart}
                alt="Like Icon"
                onClick={e => {
                  e.stopPropagation()
                  toggleLike()
                }}
                style={{ pointerEvents: 'none' }}
              />
              {currentLikeCount}
            </span>
            <span className={S.viewCount}>
              <img
                src={eye}
                alt="View Icon"
              />
              {viewCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
