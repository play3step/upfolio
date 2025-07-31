import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import Input from '@/components/common/Input'
import { useCallback, useEffect, useRef, useState } from 'react'
import Textarea from '@/components/common/Textarea'
import FileUploader from '@/components/common/FileUploader'
import type { PortfolioData, TempItem } from '@/types/portfolio'
import { useSavePortfolio } from '@/hooks/portfolio/useSavePortfolio'
import { useCheckValidation } from '@/hooks/portfolio/useCheckValidation'
import { useUserInfo } from '@/hooks/portfolio/useUserInfo'
import { useSaveTempPortfolio } from '@/hooks/portfolio/useSaveTempPortfolio'
import { usePortfolioForm } from '@/hooks/portfolio/usePortfolioForm'
import { useStickyMenu } from '@/hooks/portfolio/useStickyMenu'
import SideTempList from './SideTempList'
import supabase from '@/lib/supabaseClient'
import { useSearchParams } from 'react-router-dom'
import TechProfileSection from '@/components/domain/portfolio/TechInfoSection'
import BasicInfoSection from '@/components/domain/portfolio/BasicInfoSection'

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

  /* --- 마이페이지 임시저장글 불러오기 --- */
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!id) return

      try {
        const { data, error } = await supabase
          .from('TempPortfolio')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        if (!data) return

        setPortfolioData(prev => ({
          ...prev,
          ...data,
          id: data.id
        }))
      } catch (error) {
        console.error('임시 저장된 글 불러오기 실패:', error)
      }
    }

    fetchPortfolioData()
  }, [id])

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
  const { handleChangeForm, handleChangeRadio } = usePortfolioForm(
    setPortfolioData,
    setErrors
  )

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
  /* --- 내용 초기화 --- */
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    const Confirm = window.confirm('작성 중인 내용을 모두 초기화할까요?')
    if (!Confirm) return

    setPortfolioData(prev => ({
      ...TempData,
      id: prev.id,
      userId: prev.userId,
      name: userInfo?.nickname ?? '',
      email: userInfo?.email ?? '',
      phone: userInfo?.phone ?? '',
      birthDate: userInfo?.birthDate ?? '',
      createdAt: new Date().toISOString()
    }))

    setErrors({})
    setResetKey(prev => prev + 1)
  }

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

        <TechProfileSection
          portfolioData={portfolioData}
          handleChangeRadio={handleChangeRadio}
          handleChangeForm={handleChangeForm}
          errors={errors ?? {}}
        />

        <section className={S['sec']}>
          <h3 className="a11y-hidden">포트폴리오 소개</h3>
          <div className={S['sec__form']}>
            <Textarea
              id="exText"
              label="포트폴리오 소개"
              placeholder="포트폴리오 관련 내용을 입력해주세요."
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
