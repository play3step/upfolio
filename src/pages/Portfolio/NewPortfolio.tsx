import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import Input from '@/components/common/Input'
import { useEffect, useRef, useState } from 'react'
import type { PortfolioData } from '@/types/portfolio'
import { useSavePortfolio } from '@/hooks/portfolio/useSavePortfolio'
import { useCheckValidation } from '@/hooks/portfolio/useCheckValidation'
import { useUserInfo } from '@/hooks/portfolio/useUserInfo'
import { useSaveTempPortfolio } from '@/hooks/portfolio/useSaveTempPortfolio'
import { usePortfolioForm } from '@/hooks/portfolio/usePortfolioForm'
import { useStickyMenu } from '@/hooks/portfolio/useStickyMenu'
import SideTempList from './SideTempList'
import TechInfoSection from '@/components/domain/portfolio/TechInfoSection'
import BasicInfoSection from '@/components/domain/portfolio/BasicInfoSection'
import IntroInfoSection from '@/components/domain/portfolio/IntroInfoSection'
import DataInfoSection from '@/components/domain/portfolio/DataInfoSection'
import { useTempPortfolioList } from '@/hooks/portfolio/useTempPortfolioList'
import { usePortfolioReset } from '@/hooks/portfolio/usePortfolioReset'
import { useTempPortfolioFromMyPage } from '@/hooks/portfolio/useTempPortfolioFromMyPage'

// 초기화 데이터
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
  career: { label: '', value: '' },
  interest: { label: '', value: '' },
  techStack: [],
  linkUrl: '',
  fileList: [],
  viewCount: 0,
  likeCount: 0
}

export const NewPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(TempData)

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

  /* --- error 체크 --- */
  const { validate, errors, setErrors } = useCheckValidation()

  /* --- 입력값 변경 시 상태 저장 및 관련 에러 제거 --- */
  const { handleChangeForm, handleChangeRadio } = usePortfolioForm(
    setPortfolioData,
    setErrors
  )

  /* --- 임시저장목록, 항목 불러오기 --- */
  const {
    tempList,
    fetchTempList,
    isSideOpen,
    handleOpenSide,
    handleCloseSide,
    handleSelectTempItem
  } = useTempPortfolioList({ userId, setPortfolioData, setErrors })

  /* --- 임시저장 --- */
  const { handleSaveTemp } = useSaveTempPortfolio({
    portfolioData,
    userInfo,
    onSave: fetchTempList
  })

  /* --- 저장 --- */
  const { handleSave } = useSavePortfolio({ portfolioData, userInfo, validate })

  /* --- 마이페이지 임시저장글 불러오기 --- */
  useTempPortfolioFromMyPage(setPortfolioData)

  /* --- 타이틀 및 버튼 sticky --- */
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const [isSticky, setIsSticky] = useState(false)

  useStickyMenu(stickyRef, setIsSticky)

  /* --- 내용 초기화 --- */
  const { resetKey, handleReset } = usePortfolioReset({
    setPortfolioData,
    setErrors,
    userInfo,
    TempData
  })

  return (
    <div
      key={resetKey}
      className={S.container}>
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
        <div className={S['head__inner']}>
          <div className={S['head__btn']}>
            <button
              type="button"
              onClick={handleReset}
              className={S['head__btn-reset']}>
              내용 초기화
            </button>
            <button
              type="button"
              onClick={handleOpenSide}
              className={S['head__btn-temp']}>
              임시저장 목록
            </button>
          </div>
          <div className={`tit-withBtn ${S['tit-withBtn']}`}>
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
      </div>
      <form>
        <BasicInfoSection
          portfolioData={portfolioData}
          handleChangeForm={handleChangeForm}
        />

        <TechInfoSection
          portfolioData={portfolioData}
          handleChangeRadio={handleChangeRadio}
          handleChangeForm={handleChangeForm}
          errors={errors}
        />

        <IntroInfoSection
          portfolioData={portfolioData}
          handleChangeForm={handleChangeForm}
          errors={errors}
        />

        <DataInfoSection
          portfolioData={portfolioData}
          handleChangeForm={handleChangeForm}
          errors={errors}
        />
      </form>
    </div>
  )
}
