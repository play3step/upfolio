import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { handleToggleBookmark } from '@/utils/bookmarkUtils'
import supabase from '@/lib/supabaseClient'
import S from './PortfolioDetail.module.css'
import defaultProfileImage from '@/assets/images/default-profile.png'
import Button from '@/components/common/Button'
import { scrollToSection } from '@/utils/scrollToSection'
import emptyHeart from '@/assets/icon/heart.empty.svg'
import filledHeart from '@/assets/icon/heart.fill.svg'
import emptyBookmark from '@/assets/icon/bookmark-empty.svg'
import filledBookmark from '@/assets/icon/bookmark-fill.svg'
import dm from '@/assets/icon/dm-black.svg'

interface PortfolioData {
  id: string
  userId: string
  profileimage: string
  name: string
  birthDate: string
  phone: string
  email: string
  title: string
  content: string
  career: string
  interest: string
  techStack: string[]
  linkUrl: string
  imageUrls: string[]
  likeCount: number
}

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = decodeURIComponent(id ?? '')
  const [data, setData] = useState<PortfolioData | null>(null)
  const [activeNavButton, setActiveNavButton] = useState('기본 정보')
  const [activeEditButton, setActiveEditButton] = useState('수정')
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)

  const basicInfoRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const introductionRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const handleNavButtonClick = (
    buttonName: string,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    scrollToSection(buttonName, ref, setActiveNavButton, 200)
  }

  // 좋아요 개수 supabase에서 불러오기
  useEffect(() => {
    if (!data?.id) return
  
    const fetchLikeCount = async () => {
      const { count, error } = await supabase
        .from('Like')
        .select('*', { count: 'exact', head: true })
        .eq('portfolioid', data.id)
  
      if (!error) {
        setLikeCount(count || 0)
      } else {
        console.error('좋아요 개수 불러오기 실패:', error.message)
      }
    }
  
    fetchLikeCount()
  }, [data?.id])


  // 좋아요 상태 초기화
  useEffect(() => {
    const fetchLikeState = async () => {
      if (!userId || !decodedId) return

      const { data: likeData, error: likeError } = await supabase
        .from('Like')
        .select('id')
        .eq('userid', userId)
        .eq('portfolioid', decodedId)
        .single()

      if (likeError && likeError.code !== 'PGRST116') {
        console.error('좋아요 상태 조회 실패:', likeError.message)
        return
      }

      setLike(!!likeData)
    }

    fetchLikeState()
  }, [userId, decodedId])


  useEffect(() => {
    if (data?.likeCount !== undefined) {
      setLikeCount(data.likeCount)
    }
  }, [data])

  const toggleLike = async () => {
    if (!data || !userId) return
  
    // 새 좋아요 상태
    const newLikeState = !like
  
    // optimistic UI 업데이트
    setLike(newLikeState)
    setLikeCount(prev => (newLikeState ? prev + 1 : prev - 1))
  
    try {
      if (newLikeState) {
        // 1. 좋아요 추가
        const { error: likeError } = await supabase
          .from('Like')
          .insert({
            userid: userId,
            portfolioid: data.id,  // 반드시 id가 맞는지 확인
          })
  
        if (likeError) throw likeError
  
        // 2. likeCount 증가 → Supabase 함수 호출
        const { error: rpcError } = await supabase.rpc('increment_like_count', {
          portfolioid: data.id, 
        })
  
        if (rpcError) throw rpcError
      } else {
        // 1. 좋아요 취소
        const { error: unlikeError } = await supabase
          .from('Like')
          .delete()
          .eq('userid', userId)
          .eq('portfolioid', data.id)
  
        if (unlikeError) throw unlikeError
  
        // 2. likeCount 감소 → Supabase 함수 호출
        const { error: rpcError } = await supabase.rpc('decrement_like_count', {
          portfolioid: data.id,
        })
  
        if (rpcError) throw rpcError
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 실패:', error)
      // 실패 시 상태 복구
      setLike(prev => !prev)
      setLikeCount(prev => (newLikeState ? prev - 1 : prev + 1))
    }
  }
  

  useEffect(() => {
    const fetchInitialBookmarkState = async () => {
      if (!userId || !decodedId) return

      const { data, error } = await supabase
        .from('BookMark')
        .select('id')
        .eq('userid', userId)
        .eq('portfolioid', decodedId)
        .single()

      if (error && error.code !== 'PGRST116') {
        // 'PGRST116' :  row not found
        console.error('북마크 상태 조회 실패:', error.message)
        return
      }

      setBookmark(!!data)
    }

    fetchInitialBookmarkState()
  }, [userId, decodedId])

  const toggleBookmark = async () => {
    if (!data) return
    const success = await handleToggleBookmark(data.id, userId, !bookmark)
    if (success) {
      setBookmark(prev => !prev)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        console.error('사용자가 인증되지 않았습니다.', error)
        return
      }
      setUserId(data.user.id)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!decodedId) return
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('Portfolio')
        .select('*')
        .eq('id', decodedId)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setData(data)
    }

    if (id) fetchPortfolio()
  }, [decodedId])

  if (!data) return <p>불러오는 중...</p>

  return (
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
          <button>
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
                <Button
                  children="수정"
                  className={
                    activeEditButton === '수정'
                      ? S.activeButton
                      : S.inactiveButton
                  }
                  onClick={() => setActiveEditButton('수정')}
                />
                <Button
                  children="삭제"
                  className={
                    activeEditButton === '삭제'
                      ? S.activeButton
                      : S.inactiveButton
                  }
                  onClick={() => setActiveEditButton('삭제')}
                />
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
                <p>{data.interest}</p>
              </div>

              <h3>경력</h3>
              <p>{data.career === 'junior' ? '신입' : '경력'}</p>

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
  )
}
