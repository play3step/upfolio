import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect, useContext } from 'react'
import { usePortfolioDetail } from '@/hooks/portfolio/detail/usePortfolioDetail'
import { handleToggleBookmark } from '@/apis/bookmark/bookmarkUtils'
import supabase from '@/lib/supabaseClient'
import S from './PortfolioDetail.module.css'
import defaultProfileImage from '@/assets/images/default-profile.png'
import Button from '@/components/common/Button'
import { formatTime } from '@/utils/format'
import { scrollToSection } from '@/utils/scrollToSection'
import emptyHeart from '@/assets/icon/heart.empty.svg'
import filledHeart from '@/assets/icon/heart.fill.svg'
import emptyBookmark from '@/assets/icon/bookmark-empty.svg'
import filledBookmark from '@/assets/icon/bookmark-fill.svg'
import dm from '@/assets/icon/dm-black.svg'
import dmWhite from '@/assets/icon/dm.svg'
import rightArrow from '@/assets/icon/right-arrow.svg'

import { useThreads } from '@/hooks/dm/useThreads'
import { AuthContext } from '@/context/auth/AuthContext'
import { useComment } from '@/hooks/portfolio/detail/useComment'

import download from '@/assets/icon/download.svg'
import { alertConfirm, alertError, alertSuccess } from '@/utils/alertUtils'

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = decodeURIComponent(id ?? '')
  const [activeNavButton, setActiveNavButton] = useState('기본 정보')
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const { authData } = useContext(AuthContext)

  const { comments, sendComment } = useComment(decodedId)

  const {
    data,
    like,
    setLike,
    bookmark,
    setBookmark,
    likeCount,
    setLikeCount
  } = usePortfolioDetail(decodedId)

  const basicInfoRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const introductionRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const { handleAddThreads } = useThreads()

  const commentRef = useRef<HTMLInputElement>(null)

  const isAuthor = authData?.id === data?.userId

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        commentRef.current &&
        !commentRef.current.contains(e.target as Node)
      ) {
        setIsCommentOpen(false)
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [isCommentOpen])

  useEffect(() => {
    const incrementViews = async () => {
      if (!id) {
        console.error('id 값이 유효하지 않습니다.')
        return
      }

      const { error } = await supabase.rpc('increment_views', {
        portfolioid: id
      })

      if (error) {
        console.error('조회수 증가 중 오류 발생:', error.message)
      }
    }

    incrementViews()
  }, [id])

  const handleNavButtonClick = (
    buttonName: string,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    scrollToSection(buttonName, ref, setActiveNavButton, 200)
  }

  if (!data) return <p>불러오는 중...</p>

  const toggleLike = async () => {
    if (!decodedId || !authData?.id) return

    const nextLike = !like
    setLike(nextLike)

    if (nextLike) {
      const { error } = await supabase.from('like_table').upsert({
        portfolioid: decodedId,
        userid: authData?.id
      })

      if (error) {
        console.error('좋아요 추가 중 오류 발생:', error.message)
        setLike(!nextLike) // 원래 상태로 되돌리기
      } else {
        setLikeCount(prev => prev + 1)
      }
    } else {
      // 좋아요 취소
      const { error } = await supabase
        .from('like_table')
        .delete()
        .eq('portfolioid', decodedId)
        .eq('userid', authData?.id)

      if (error) {
        console.error('좋아요 취소 중 오류 발생:', error.message)
        setLike(!nextLike)
      } else {
        setLikeCount(prev => Math.max(prev - 1, 0)) // 최소 0으로 유지
      }
    }
  }

  const toggleBookmark = async () => {
    const nextBookmark = !bookmark
    setBookmark(nextBookmark)

    const success = await handleToggleBookmark(
      decodedId,
      authData?.id ?? null,
      nextBookmark
    )
    if (!success) {
      setBookmark(!nextBookmark) // 원래 상태로 되돌리기
    }
  }

  const toggleCommentPanel = () => {
    setIsCommentOpen(prev => !prev)
  }

  const handleSubmitComment = async () => {
    if (!authData?.id) {
      const ok = await alertConfirm({
        title: '로그인이 필요합니다.',
        text: '로그인 페이지로 이동할까요?'
      })

      if (ok) {
        navigate('/login')
      }
      return
    }

    await sendComment(inputValue, data?.userId)
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitComment()
    }
  }

  const handleDelete = async () => {
    const confirmDelete = await alertConfirm({
      title: '포트폴리오 삭제',
      text: '정말로 삭제하시겠습니까?',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    })
    if (!confirmDelete) return

    const { error } = await supabase
      .from('Portfolio')
      .delete()
      .eq('id', data.id)

    if (error) {
      alertError({
        title: '포트폴리오 삭제 실패',
        text: '포트폴리오 삭제가 실패했습니다.'
      })
    } else {
      alertSuccess({
        title: '포트폴리오 삭제 완료',
        text: '포트폴리오 삭제가 완료되었습니다.'
      })
      navigate(-1)
    }
  }

  const getInterestClass = (interest: string) => {
    switch (interest) {
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
    <div className={S.wrapper}>
      <aside
        title="댓글창"
        className={S.commentContainer}
        ref={commentRef}
        style={{
          transform: isCommentOpen
            ? 'translateX(0)'
            : 'translateX(calc(100% - 2rem))',
          transition: 'transform 0.3s ease-in-out'
        }}>
        <div className={S.commentHeader}>
          <button
            onClick={toggleCommentPanel}
            className={S.commentToggleBtn}>
            <img src={rightArrow} />
          </button>
          <h3>댓글</h3>
        </div>
        <div className={S.commentList}>
          {comments.length > 0
            ? comments.map(comment => (
                <div
                  key={comment.id}
                  className={S.commentItem}>
                  <div className={S.commentHeader}>
                    <img
                      src={comment.profileimage}
                      alt="프로필"
                      className={S.avatar}
                    />

                    <div className={S.commentMeta}>
                      <span className={S.username}>
                        {comment.nickname ? comment.nickname : '익명의 사용자'}
                      </span>
                      <span className={S.timestamp}>
                        {formatTime(comment.createdat)}
                      </span>
                    </div>
                  </div>
                  <p className={S.content}>{comment.content}</p>
                </div>
              ))
            : ''}
        </div>
        <div className={S.commentInputWrapper}>
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={S.commentInput}
          />
          <button
            onClick={handleSubmitComment}
            className={S.sendButton}>
            <img
              src={dmWhite}
              alt="보내기"
            />
          </button>
        </div>
      </aside>

      <div className={S.container}>
        <div className={S.bookmarkLike}>
          <div className={S.like}>
            <button onClick={toggleLike}>
              <img
                src={like ? filledHeart : emptyHeart}
                alt={like ? '채워진 하트 아이콘' : '빈 하트 아이콘'}
              />
              <span>{likeCount}</span>
            </button>
          </div>
          <div className={S.bookmark}>
            <button onClick={toggleBookmark}>
              <img
                src={bookmark ? filledBookmark : emptyBookmark}
                alt={bookmark ? '채워진 북마크 아이콘' : '빈 북마크 아이콘'}
              />
              <span>{bookmark ? '북마크 취소' : '북마크'}</span>
            </button>
          </div>
          <div className={S.dm}>
            <button onClick={() => handleAddThreads(data?.userId ?? '')}>
              <img
                src={dm}
                alt="DM 아이콘"
              />
              <span>DM 보내기</span>
            </button>
          </div>
        </div>

        <div className={S.navDetail}>
          <nav className={S.nav}>
            <Button
              children="기본 정보"
              className={
                activeNavButton === '기본 정보'
                  ? S.activeButton
                  : S.inactiveButton
              }
              onClick={() => handleNavButtonClick('기본 정보', basicInfoRef)}
            />
            <Button
              children="경력 / 지원 / 기술"
              className={
                activeNavButton === '경력 / 지원 / 기술'
                  ? S.activeButton
                  : S.inactiveButton
              }
              onClick={() =>
                handleNavButtonClick('경력 / 지원 / 기술', techStackRef)
              }
            />
            <Button
              children="포트폴리오 소개"
              className={
                activeNavButton === '포트폴리오 소개'
                  ? S.activeButton
                  : S.inactiveButton
              }
              onClick={() =>
                handleNavButtonClick('포트폴리오 소개', introductionRef)
              }
            />
            <Button
              children="포트폴리오 자료"
              className={
                activeNavButton === '포트폴리오 자료'
                  ? S.activeButton
                  : S.inactiveButton
              }
              onClick={() =>
                handleNavButtonClick('포트폴리오 자료', portfolioRef)
              }
            />
          </nav>
          <div className={S.detailWrapper}>
            <div ref={basicInfoRef}>
              <div className="tit-withBtn">
                <h1 className="tit__txt">{data.title}</h1>
                <div style={{ display: 'flex', gap: '.75rem' }}>
                  {isAuthor && (
                    <>
                      <Button
                        children="수정"
                        line
                        onClick={() => navigate(`/edit/${data.id}`)}
                      />
                      <Button
                        children="삭제"
                        onClick={handleDelete}
                      />
                    </>
                  )}
                </div>
              </div>

              <section className={S.profile}>
                <img
                  src={
                    data.profileImage ? data.profileImage : defaultProfileImage
                  }
                  alt="프로필"
                />
                <div>
                  <h4>{data.name}</h4>
                  <h4>{data.birthDate}</h4>
                </div>
              </section>

              <section className={S.emailPhone}>
                <h3>이메일</h3>
                <p>{data.email}</p>
                <h3>전화번호</h3>
                <p>{data.phone}</p>
              </section>
            </div>

            <hr />

            <div ref={techStackRef}>
              <section className={S.interestStack}>
                <h3>경력</h3>
                <p>{data.career?.label}</p>

                <h3>지원 분야</h3>
                <div
                  className={`${S.interest} ${getInterestClass(data.interest.label)}`}>
                  <p>{data.interest.label}</p>
                </div>

                <h3>기술 스택</h3>
                <p>{data.techStack?.join(' | ')}</p>
              </section>
            </div>

            <hr />

            <div ref={introductionRef}>
              <section className={S.description}>
                <h3>소개</h3>
                <p>{data.content}</p>
              </section>
            </div>

            <hr />

            <div ref={portfolioRef}>
              <section className={S.urlFile}>
                <h3>포트폴리오 자료</h3>
                <h3>URL</h3>
                <a
                  href={
                    data.linkUrl?.startsWith('http')
                      ? data.linkUrl
                      : `https://${data.linkUrl}`
                  }
                  target="_blank"
                  rel="noreferrer">
                  {data.linkUrl}
                </a>

                <h3>첨부파일</h3>

                {data.fileList.map(file => (
                  <div className={S.fileList}>
                    <a
                      href={
                        file.url?.startsWith('http')
                          ? file.url
                          : `https://${file.url}`
                      }
                      target="_blank"
                      rel="noreferrer">
                      {file.name}
                    </a>
                    <img
                      src={download}
                      onClick={e => {
                        e.preventDefault()
                        const url = file.url?.startsWith('http')
                          ? file.url
                          : `https://${file.url}`
                        fetch(url)
                          .then(response => response.blob())
                          .then(blob => {
                            const blobUrl = window.URL.createObjectURL(blob)
                            const link = document.createElement('a')
                            link.href = blobUrl
                            link.download = file.name
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                            window.URL.revokeObjectURL(blobUrl)
                          })
                      }}
                      alt="다운로드"
                    />
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
