import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import Input from '@/components/common/Input'
import RadioGroup from '@/components/common/RadioGroup'
import { useCallback, useEffect, useRef, useState } from 'react'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import Textarea from '@/components/common/Textarea'
import FileUploader from '@/components/common/FileUploader'
import ImageUploader from '@/components/common/ImageUploader'
import type { PortfolioData, TempItem } from '@/types/portfolio'
import { useSavePortfolio } from '@/hooks/portfolio/useSavePortfolio'
import { useCheckValidation } from '@/hooks/portfolio/useCheckValidation'
import { useUserInfo } from '@/hooks/portfolio/useUserInfo'
import { useSaveTempPortfolio } from '@/hooks/portfolio/useSaveTempPortfolio'
import { usePortfolioForm } from '@/hooks/portfolio/usePortfolioForm'
import { useStickyMenu } from '@/hooks/portfolio/useStickyMenu'
import SideTempList from './SideTempList'
import supabase from '@/lib/supabaseClient'

// TODOS : 기본정보 마이페이지에서 불러와야함
const TempData: PortfolioData = {
  id: '',
  userId: '',
  profileImage: '',
  name: '',
  birthDate: '',
  phone: '',
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

export const NewPortfolio = () => {
  /* --- 지원분야 라디오 그룹 상태 및 옵션 --- */
  const INTEREST_SELECT = [
    { label: '프론트엔드 개발', value: 'FE' },
    { label: '백엔드 개발', value: 'BE' },
    { label: '풀스택 개발', value: 'FullStack' },
    { label: '모바일 개발', value: 'Mobile' },
    { label: '임베디드 개발', value: 'Embedded' },
    { label: 'UI/UX 디자인', value: 'UIUX' },
    { label: '그래픽 디자인', value: 'Graphic' },
    { label: '모션 디자인', value: 'Motion' },
    { label: '일러스트', value: 'Illustration' }
  ]

  /* --- 경력 수준 라디오 그룹 상태 및 옵션 --- */
  const CAREER_SELECT = [
    { label: '신입 (0년)', value: 'zeroYear' },
    { label: '1년차 이상', value: 'oneYearsPlus' },
    { label: '3년차 이상', value: 'threeYearsPlus' },
    { label: '5년차 이상', value: 'fiveYearsPlus' },
    { label: '10년차 이상', value: 'tenYearsPlus' }
  ]

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(TempData)

  /* --- error 체크 --- */
  const { validate, errors, setErrors } = useCheckValidation()

  /* --- 로그인 시 유저정보 불러오기 --- */
  const { userInfo } = useUserInfo()
  const userId = userInfo?.id ?? null

  useEffect(() => {
    if (userInfo) {
      setPortfolioData(prev => ({
        ...prev,
        name: userInfo.nickname,
        email: userInfo.email,
        phone: userInfo.phone ?? '',
        birthDate: userInfo.birthDate ?? '',
        createdAt: new Date().toISOString()
      }))
    }
  }, [userInfo])

  /* --- 입력값 변경 시 상태 저장 및 관련 에러 제거 --- */
  const { handleChangeForm } = usePortfolioForm(setPortfolioData, setErrors)

  /* --- 임시저장목록 --- */
  // 사이드 패널 열고 닫기
  const [isSideOpen, setSideOpen] = useState(false)

  const handleOpenSide = () => {
    setSideOpen(true)
  }

  const handleCloseSide = () => {
    setSideOpen(false)
  }

  // 임시저장 목록 불러오기
  const [tempList, setTempList] = useState<TempItem[]>([])

  const fetchTempList = useCallback(async () => {
    if (!userId) return

    try {
      const { data, error } = await supabase
        .from('TempPortfolio')
        .select('id,title,createdAt')
        .eq('userId', userId)
        .order('createdAt', { ascending: false })

      if (error) throw error

      setTempList(data ?? [])
    } catch (error) {
      console.error('임시저장 목록 불러오기 실패', error)
    }
  }, [userId])

  useEffect(() => {
    fetchTempList()
  }, [fetchTempList])

  const handleSelectTempItem = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('TempPortfolio')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) return
      console.log(typeof data.techStack, data.techStack)
      setErrors({})

      setPortfolioData(prev => ({
        ...prev,
        ...data,
        id: data.id
      }))

      setSideOpen(false)
    } catch (error) {
      console.error('임시저장된 항목 불러오기 실패', error)
    }
  }

  /* --- 임시저장 --- */
  const { handleSaveTemp } = useSaveTempPortfolio({
    portfolioData,
    userInfo,
    onSave: fetchTempList
  })

  /* --- 저장 --- */
  const { handleSave } = useSavePortfolio({ portfolioData, userInfo, validate })

  /* --- 타이틀 및 버튼 sticky --- */
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useStickyMenu(stickyRef, setIsSticky)

  return (
    <div className={S.container}>
      {/* 임시저장목록 사이드 패널 */}
      <SideTempList
        isOpen={isSideOpen}
        isClose={handleCloseSide}
        tempList={tempList}
        onSelect={handleSelectTempItem}
      />

      {/* 포트폴리오 작성 목록 */}
      <div
        ref={stickyRef}
        className={`${S.head} ${isSticky ? S.sticky : ''}`}>
        <h2 className="a11y-hidden">포트폴리오 등록</h2>
        <button
          type="button"
          onClick={handleOpenSide}
          className={S['head__tempListBtn']}>
          임시저장 목록
        </button>
        <div className={'tit-withBtn'}>
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
      </div>
      <form>
        <section className={S['sec']}>
          <h3 className="a11y-hidden">기본정보</h3>
          <div className={S['sec__profile']}>
            <ImageUploader
              key={portfolioData.id}
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
              onChange={stack => {
                handleChangeForm('techStack', stack)
              }}
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
              key={portfolioData.id}
              value={portfolioData.fileList}
              onChange={files => handleChangeForm('fileList', files)}
              error={errors.linkUrl}
            />
          </div>
        </section>
      </form>
    </div>
  )
}
