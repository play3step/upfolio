// EditPortfolio.tsx
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css' // 재사용
import { type PortfolioData } from '@/types/portfolio'
import { useCheckValidation } from '@/hooks/portfolio/useCheckValidation'

import { usePortfolioForm } from '@/hooks/portfolio/usePortfolioForm'

import BasicInfoSection from '@/components/portfolio/BasicInfoSection'
import TechInfoSection from '@/components/portfolio/TechInfoSection'
import IntroInfoSection from '@/components/portfolio/IntroInfoSection'
import DataInfoSection from '@/components/portfolio/DataInfoSection'
import { useStickyMenu } from '@/hooks/portfolio/useStickyMenu'
import { useEditPortfolio } from '@/hooks/portfolio/detail/useEditPortfolio'
import { alertError, alertSuccess, alertWarning } from '@/utils/alertUtils'

const EMPTY_DATA: PortfolioData = {
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
  fileList: [
    {
      name: '',
      url: ''
    }
  ],
  viewCount: 0
}

const EditPortfolio = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(EMPTY_DATA)

  const { errors, setErrors } = useCheckValidation()

  const { handleChangeForm, handleChangeRadio } = usePortfolioForm(
    setPortfolioData,
    setErrors
  )

  // 포트폴리오 데이터 불러오기
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) return

      try {
        const { data, error } = await supabase
          .from('Portfolio')
          .select('*')
          .eq('id', id)
          .single()

        if (error || !data) throw error

        const formattedData = {
          ...data,
          fileList: data.fileList.map(
            (file: { name: string; url: string }) => ({
              name: file.name,
              url: file.url
            })
          )
        }
        setPortfolioData(formattedData)
        setOriginalData(formattedData)
      } catch (e) {
        alertError({
          title: '포트폴리오 정보 불러오기 실패',
          text: '다시 시도해보세요.'
        })
        console.error(e)
        navigate('/portfolio')
      }
    }

    fetchPortfolio()
  }, [id, navigate])

  const [originalData, setOriginalData] = useState<PortfolioData>(EMPTY_DATA)
  const { handleEditPortfolio } = useEditPortfolio(portfolioData)

  const handleSave = () => {
    const hasChanges =
      JSON.stringify(originalData) !== JSON.stringify(portfolioData)

    if (!hasChanges) {
      alertWarning({
        title: '변경된 내용이 없습니다.',
        text: '포트폴리오 내용을 수정해주세요.'
      })
      return
    }

    alertSuccess({
      title: '포트폴리오 수정 완료',
      text: '포트폴리오 수정이 완료되었습니다.'
    })

    handleEditPortfolio()
  }

  const stickyRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  useStickyMenu(stickyRef, setIsSticky)

  return (
    <div className={S.container}>
      <div
        ref={stickyRef}
        className={`${S.head} ${isSticky ? S.sticky : ''}`}>
        <h2 className="a11y-hidden">포트폴리오 수정</h2>
        <div className={S['head__inner']}>
          <div className={`tit-withBtn ${S['tit-withBtn']}`}>
            <Input
              className={`'tit__txt' ${S['tit__input']}`}
              id="editTitle"
              type="text"
              value={portfolioData.title}
              placeholder="포트폴리오 제목을 입력해주세요."
              onChange={e => handleChangeForm('title', e.target.value)}
              error={errors.title}
              hideLabel
            />
            <Button onClick={handleSave}>저장</Button>
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

export default EditPortfolio
