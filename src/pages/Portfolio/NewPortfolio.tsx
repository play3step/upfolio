import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import Input from '@/components/common/Input'
import RadioGroup from '@/components/common/RadioGroup'
import { useEffect, useRef, useState } from 'react'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import Textarea from '@/components/common/Textarea'
import FileUploader from '@/components/common/FileUploader'
import ImageUploader from '@/components/common/ImageUploader'
import supabase from '@/lib/supabaseClient'
import throttle from 'lodash.throttle'

interface UserInfo {
  id: string
  email: string
}

interface PortfolioData {
  id: string
  userId: string
  profileImage: string
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
  fileList: { name: string; url: string }[]
  viewCount?: number
  likeCount?: number
}

const TempData: PortfolioData = {
  id: '',
  userId: '',
  profileImage: '',
  name: '홍길동',
  birthDate: '2000.04.03',
  phone: '010-0000-0000',
  email: '',
  title: '',
  content: '',
  career: '',
  interest: '',
  techStack: [],
  linkUrl: '',
  fileList: [],
  viewCount: 0,
  likeCount: 0
}

type ValidationError = Partial<Record<keyof PortfolioData, string>>

export const NewPortfolio = () => {
  /* --- 지원분야 라디오 그룹 상태 및 옵션 --- */
  const INTEREST_SELECT = [
    { label: '프론트엔드', value: 'FE' },
    { label: '백엔드', value: 'BE' },
    { label: '풀스택', value: 'FullStack' },
    { label: '모바일', value: 'Mobile' },
    { label: '임베디드', value: 'Embedded' },
    { label: 'UI/UX 디자인', value: 'UIUX' },
    { label: '그래픽 디자인', value: 'Graphic' },
    { label: '모션 디자인', value: 'Motion' },
    { label: '일러스트', value: 'Illustration' }
  ]

  /* --- 경력 수준 라디오 그룹 상태 및 옵션 --- */
  const CAREER_SELECT = [
    { label: '신입', value: 'junior' },
    { label: '경력', value: 'senior' }
  ]

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(TempData)
  const [errors, setErrors] = useState<ValidationError>({})
  /* --- error 체크 --- */
  const validate = () => {
    const newErrors: ValidationError = {}

    if (!portfolioData.title.trim()) newErrors.title = '제목을 입력해주세요.'
    if (!portfolioData.career.trim())
      newErrors.career = '경력수준을 선택해주세요.'
    if (!portfolioData.interest.trim())
      newErrors.interest = '지원분야를 선택해주세요.'
    if (portfolioData.techStack.length === 0)
      newErrors.techStack = '기술스택을 선택해주세요.'
    if (!portfolioData.content.trim())
      newErrors.content = '소개를 입력해주세요.'
    if (!portfolioData.linkUrl.trim() && portfolioData.fileList.length === 0)
      newErrors.linkUrl = 'URL 또는 파일 첨부 중 하나는 반드시 입력해주세요.'

    setErrors(newErrors)

    return Object.keys(newErrors).length == 0
  }

  /* --- 로그인 시 유저정보 불러오기 --- */
  useEffect(() => {
    if (userInfo?.email) {
      setPortfolioData(prev => ({
        ...prev,
        email: userInfo.email
      }))
    }
  }, [userInfo])

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (error) {
        console.error('유저 정보 불러오기 실패:', error)
        return
      }

      if (user && user.email) {
        setUserInfo({ id: user.id, email: user.email })
      }
    }

    fetchUserInfo()
  }, [])

  /* --- 입력값 변경 시 상태 저장 및 관련 에러 제거 --- */
  const handleChangeForm = <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => {
    setPortfolioData(prev => ({
      ...prev,
      [key]: value
    }))

    setErrors(prevErrors => {
      const newErrors = { ...prevErrors }

      if (key === 'linkUrl' || key === 'fileList') {
        delete newErrors.linkUrl
        delete newErrors.fileList
      } else if (newErrors[key]) {
        delete newErrors[key]
      }
      return newErrors
    })
  }

  /* --- 임시저장 --- */
  const handleSaveTemp = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { viewCount, likeCount, ...rest } = portfolioData

      const { error } = await supabase
        .from('TempPortfolio')
        .upsert(
          { ...rest, userId: userInfo?.id, id: undefined },
          { onConflict: 'id' }
        )
      if (error) throw error
      alert('임시저장되었습니다.')
    } catch (error) {
      alert('임시저장이 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  /* --- 저장 --- */
  const handleSave = async () => {
    if (!validate()) {
      alert('빠진 부분이 있는지 확인해주세요.')
      return
    }
    try {
      const { error } = await supabase.from('Portfolio').insert({
        ...portfolioData,
        userId: userInfo?.id,
        id: undefined,
        viewCount: 0,
        likeCount: 0
      })
      if (error) throw error
      alert('포트폴리오가 저장되었습니다.')
    } catch (error) {
      alert('저장에 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  /* --- 타이틀 및 버튼 sticky --- */
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!stickyRef.current) return

      const stickyPosition = stickyRef.current.getBoundingClientRect().top ?? 0
      const yes = stickyPosition <= 0
      setIsSticky(yes)
    }, 200)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
    }
  }, [])

  return (
    <div className={S.container}>
      <div
        ref={stickyRef}
        className={`tit-withBtn ${isSticky ? 'sticky' : ''}`}>
        <h2 className="a11y-hidden">포트폴리오 등록</h2>
        <Input
          className={`'tit__txt' ${S['tit__input']}`}
          id="exTitle"
          type="text"
          value={portfolioData.title}
          placeholder="포트폴리오 제목을 입력해주세요."
          onChange={e => handleChangeForm('title', e.target.value)}
          error={errors.title}
          hideLabel
        />
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Button
            onClick={handleSaveTemp}
            line>
            임시저장
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>

      <form>
        <section className={S['sec']}>
          <h3 className="a11y-hidden">기본정보</h3>
          <div className={S['sec__profile']}>
            <ImageUploader
              id="exImage"
              value={portfolioData.profileImage}
              onChange={image => handleChangeForm('profileImage', image)}
            />
            <dl className={S['sec__profile__info']}>
              <dt className="a11y-hidden">이름</dt>
              <dd>{portfolioData.name}</dd>

              <dt className="a11y-hidden">생년월일</dt>
              <dd>{portfolioData.birthDate}</dd>
            </dl>
          </div>

          <div className={S.sec__form}>
            <Input
              id="exId01"
              label="이메일"
              value={portfolioData.email}
              readOnly
            />

            <Input
              type="tel"
              id="exId02"
              label="전화번호"
              value={portfolioData.phone}
              readOnly
            />
          </div>
        </section>

        <section className={S['sec']}>
          <h3 className="a11y-hidden">지원분야 / 경력 수준 / 기술 스택</h3>
          <div className={S['sec__form']}>
            <RadioGroup
              label="경력수준"
              name="careerOption"
              options={CAREER_SELECT}
              checked={portfolioData.career}
              onChange={e => handleChangeForm('career', e.target.value)}
              error={errors.career}
            />

            <RadioGroup
              label="지원분야"
              name="fieldOfSupport"
              options={INTEREST_SELECT}
              checked={portfolioData.interest}
              onChange={e => handleChangeForm('interest', e.target.value)}
              error={errors.interest}
            />

            <CheckboxSelect
              value={portfolioData.techStack}
              onChange={stack => handleChangeForm('techStack', stack)}
              error={errors.techStack}
            />
          </div>
        </section>

        <section className={S['sec']}>
          <h3 className="a11y-hidden">포트폴리오 소개</h3>
          <div className={S['sec__form']}>
            <Textarea
              id="exText"
              label="포트폴리오 소개"
              value={portfolioData.content}
              onChange={e => handleChangeForm('content', e.target.value)}
              error={errors.content}
            />
          </div>
        </section>

        <section className={S['sec']}>
          <h3 className={S['sec__tit']}>포트폴리오 자료</h3>
          <div className={S['sec__form']}>
            <div className={S['input-prefix']}>
              <span className={S['prefix']}>https://</span>
              <Input
                type="text"
                id="exId05"
                label="URL"
                value={portfolioData.linkUrl}
                className={S['input-wrap']}
                onChange={e => handleChangeForm('linkUrl', e.target.value)}
                error={errors.linkUrl}
              />
            </div>

            <FileUploader
              onChange={files => handleChangeForm('fileList', files)}
              error={errors.linkUrl}
            />
          </div>
        </section>
      </form>
    </div>
  )
}
