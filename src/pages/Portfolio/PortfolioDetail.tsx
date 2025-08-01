import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { usePortfolioDetail } from '@/hooks/usePortfolioDetail'
import { handleToggleBookmark } from '@/apis/bookmark/bookmarkUtils'
import supabase from '@/lib/supabaseClient'
import S from './PortfolioDetail.module.css'
import defaultProfileImage from '@/assets/images/default-profile.png'
import Button from '@/components/common/Button'
import { formatTime } from '@/utils/formatTime'
import { scrollToSection } from '@/utils/scrollToSection'
import emptyHeart from '@/assets/icon/heart.empty.svg'
import filledHeart from '@/assets/icon/heart.fill.svg'
import emptyBookmark from '@/assets/icon/bookmark-empty.svg'
import filledBookmark from '@/assets/icon/bookmark-fill.svg'
import dm from '@/assets/icon/dm-black.svg'
import dmWhite from '@/assets/icon/dm.svg'
import rightArrow from '@/assets/icon/right-arrow.svg'

import { useThreads } from '@/hooks/dm/useThreads'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

interface CommentType {
  id: string
  content: string
  profileimage: string
  createdat: string
  portfolioid: string
  userid: string
  nickname: string
}

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = decodeURIComponent(id ?? '')
  const [activeNavButton, setActiveNavButton] = useState('기본 정보')
  const [activeEditButton, setActiveEditButton] = useState('수정')
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])
  const navigate = useNavigate()
  const { authData } = useAuthLogin()

  const {
    data,
    like,
    setLike,
    bookmark,
    setBookmark,
    likeCount,
    setLikeCount,
    userId,
    interest,
    career
  } = usePortfolioDetail(decodedId)

  const basicInfoRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const introductionRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const { handleAddThreads } = useThreads()

  const isAuthor = authData?.id === data?.userId

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('Comment')
      .select('*')
      .eq('portfolioid', decodedId)
      .order('createdat', { ascending: true })

    if (error) {
      console.error('댓글 불러오기 실패:', error.message)
      return
    }

    setComments(data || [])
  }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchComments()
      } catch (error) {
        console.error('댓글 데이터를 가져오는 중 오류 발생: ', error)
      }
    }
    fetchData()
  }, [])

  const handleNavButtonClick = (
    buttonName: string,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    scrollToSection(buttonName, ref, setActiveNavButton, 200)
  }

  if (!data) return <p>불러오는 중...</p>

  const toggleLike = async () => {
    if (!decodedId || !userId) return

    const nextLike = !like
    setLike(nextLike)

    if (nextLike) {
      const { error } = await supabase.from('like_table').upsert({
        portfolioid: decodedId,
        userid: userId
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
        .eq('userid', userId)

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

    const success = await handleToggleBookmark(decodedId, userId, nextBookmark)
    if (!success) {
      setBookmark(!nextBookmark) // 원래 상태로 되돌리기
    }
  }

  const toggleCommentPanel = () => {
    setIsCommentOpen(prev => !prev)
  }

  const handleSendComment = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      alert('로그인이 필요합니다.')
      return
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('nickname, profileimage')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('프로필 정보 조회 실패:', profileError)
      return
    }

    if (!inputValue.trim()) return

    const newComment = {
      id: crypto.randomUUID(),
      content: inputValue.trim(),
      profileimage: userProfile.profileimage || defaultProfileImage,
      createdat: new Date().toISOString(),
      portfolioid: decodedId,
      userid: user.id,
      nickname: userProfile.nickname
    }

    await supabase.from('Comment').insert([newComment])

    setComments(prev => [...prev, newComment])
    setInputValue('')
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?')
    if (!confirmDelete) return

    const { error } = await supabase
      .from('Portfolio')
      .delete()
      .eq('id', data.id)

    if (error) {
      alert('삭제 실패: ' + error.message)
    } else {
      alert('삭제되었습니다.')
      navigate('/') // 홈 또는 포트폴리오 목록으로 이동
    }
  }

  return (
    <>
      <nav
        className={S.commentContainer}
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
          {isCommentOpen
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
            className={S.commentInput}
          />
          <button
            onClick={handleSendComment}
            className={S.sendButton}>
            <img
              src={dmWhite}
              alt="보내기"
            />
          </button>
        </div>
      </nav>

      <div className={S.container}>
        <div className={S.bookmarkLike}>
          <div className={S.like}>
            <button onClick={toggleLike}>
              <img
                src={like ? filledHeart : emptyHeart}
                alt={like ? '채워진 하트 아이콘' : '빈 하트 아이콘'}
              />
            </button>
            <span>{likeCount}</span>
          </div>
          <div className={S.bookmark}>
            <button onClick={toggleBookmark}>
              <img
                src={bookmark ? filledBookmark : emptyBookmark}
                alt={bookmark ? '채워진 북마크 아이콘' : '빈 북마크 아이콘'}
              />
            </button>
            <span>{bookmark ? '북마크 취소' : '북마크'}</span>
          </div>
          <div className={S.dm}>
            <button onClick={() => handleAddThreads(data?.userId ?? '')}>
              <img
                src={dm}
                alt="DM 아이콘"
              />
            </button>
            <span>DM 보내기</span>
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
              children="지원 분야 / 기술 스택"
              className={
                activeNavButton === '지원 분야 / 기술 스택'
                  ? S.activeButton
                  : S.inactiveButton
              }
              onClick={() =>
                handleNavButtonClick('지원 분야 / 기술 스택', techStackRef)
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
              <div className={S.titleWrapper}>
                <h1 className={S.title}>{data.title}</h1>
                <div className={S.editButtons}>
                  {isAuthor && (
                    <>
                      <Button
                        children="수정"
                        className={
                          activeEditButton === '수정'
                            ? S.activeButton
                            : S.inactiveButton
                        }
                        onClick={() => navigate(`/edit/${data.id}`)}
                      />
                      <Button
                        children="삭제"
                        className={
                          activeEditButton === '삭제'
                            ? S.activeButton
                            : S.inactiveButton
                        }
                        onClick={handleDelete}
                      />
                    </>
                  )}
                </div>
              </div>

              <section className={S.profile}>
                <img
                  src={
                    data.profileimage ? data.profileimage : defaultProfileImage
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
                <h3>지원 분야</h3>
                <div className={S.interest}>
                  <p>{data.interest?.label || interest}</p>
                </div>

                <h3>경력</h3>
                <p>{data.career?.label || career}</p>

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
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
