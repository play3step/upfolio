// EditPortfolio.tsx
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css' // 재사용
import {
  type PortfolioData,
  type TempItem,
  type UserInfo,
  type ValidationError
} from '@/types/portfolio'
import { useCheckValidation } from '@/hooks/portfolio/useCheckValidation'
import { useUserInfo } from '@/hooks/portfolio/useUserInfo'
import { usePortfolioForm } from '@/hooks/portfolio/usePortfolioForm'
import { useSavePortfolio } from '@/hooks/portfolio/useSavePortfolio'
import BasicInfoSection from '@/components/domain/portfolio/BasicInfoSection'
import TechInfoSection from '@/components/domain/portfolio/TechInfoSection'
import IntroInfoSection from '@/components/domain/portfolio/IntroInfoSection'
import DataInfoSection from '@/components/domain/portfolio/DataInfoSection'
import { useStickyMenu } from '@/hooks/portfolio/useStickyMenu'

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
  fileList: [],
  viewCount: 0
}

const EditPortfolio = () => {
  const { id } = useParams() 
  const navigate = useNavigate()

  const [portfolioData, setPortfolioData] = useState<PortfolioData>(EMPTY_DATA)

  const { userInfo } = useUserInfo()
  const userId = userInfo?.id ?? null

  const { validate, errors, setErrors } = useCheckValidation()

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

        setPortfolioData({
          ...data,
          career: {
            label: convertLabel(data.career),
            value: data.career
          },
          interest: {
            label: convertLabel(data.interest),
            value: data.interest
          },
          fileList: data.fileList.map((url: string) => ({
            name: url.split('/').pop() || '',
            url
          }))
        })
      } catch (e) {
        alert('포트폴리오 정보를 불러오는 데 실패했습니다.')
        console.error(e)
        navigate('/portfolio') 
      }
    }

    fetchPortfolio()
  }, [id, navigate])


  const convertLabel = (value: string): string => {
    const map = {
      zeroYear: '신입 (0년)',
      oneYearsPlus: '1년차 이상',
      threeYearsPlus: '3년차 이상',
      fiveYearsPlus: '5년차 이상',
      tenYearsPlus: '10년차 이상',
      FE: '프론트엔드 개발',
      BE: '백엔드 개발',
      FullStack: '풀스택 개발',
      Mobile: '모바일 개발',
      Embedded: '임베디드 개발',
      UIUX: 'UI/UX 디자인',
      Graphic: '그래픽 디자인',
      Motion: '모션 디자인',
      Illustration: '일러스트'
    }

    return map[value as keyof typeof map] ?? value
  }

  const { handleSave } = useSavePortfolio({ portfolioData, userInfo, validate })

  const stickyRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  useStickyMenu(stickyRef, setIsSticky)

  return (
    <div className={S.container}>
      <div ref={stickyRef} className={`${S.head} ${isSticky ? S.sticky : ''}`}>
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
