import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import Input from '@/components/common/Input'
import RadioGroup from '@/components/common/RadioGroup'
import { useEffect, useState } from 'react'
import CheckboxSelect from '@/components/common/CheckboxSelect'
import Textarea from '@/components/common/Textarea'
import FileUploader from '@/components/common/FileUploader'
import ImageUploader from '@/components/common/ImageUploader'
import supabase from '@/lib/supabaseClient'

interface UserInfo {
  id: string
  email: string
}

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
}

const TempData: PortfolioData = {
  id: '',
  userId: '',
  profileimage: '',
  name: '홍길동',
  birthDate: '2000.04.03',
  phone: '010-0000-0000',
  email: '',
  title: '',
  content: '',
  career: 'junior',
  interest: 'FE',
  techStack: [],
  linkUrl: '',
  imageUrls: []
}

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

  // 데이터 바뀔때마다 저장 핸들러
  const handleChangeForm = <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => {
    setPortfolioData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveTemp = async () => {
    try {
      const { error } = await supabase
        .from('TempPortfolio')
        .upsert(
          { ...portfolioData, userId: userInfo?.id, id: undefined },
          { onConflict: 'id' }
        )
      if (error) throw error
      alert('임시저장되었습니다.')
    } catch (error) {
      alert('임시저장이 실패하였습니다. 다시 시도해주세요.')
      console.error(error)
    }
  }

  return (
    <div className={S.container}>
      <div className="tit-withBtn">
        <h2 className="a11y-hidden">포트폴리오 등록</h2>
        <input
          className="tit__txt"
          id="exTitle"
          type="text"
          placeholder="포트폴리오 제목을 입력해주세요."
          onChange={e => handleChangeForm('title', e.target.value)}
        />
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Button
            onClick={handleSaveTemp}
            line>
            임시저장
          </Button>
          <Button>저장</Button>
        </div>
      </div>

      <form>
        <section className={S['sec']}>
          <h3 className="a11y-hidden">기본정보</h3>
          <div className={S['sec__profile']}>
            <ImageUploader
              id="exImage"
              value={portfolioData.profileimage}
              onChange={image => handleChangeForm('profileimage', image)}
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
              value="010-1234-5678"
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
            />

            <RadioGroup
              label="지원분야"
              name="fieldOfSupport"
              options={INTEREST_SELECT}
              checked={portfolioData.interest}
              onChange={e => handleChangeForm('interest', e.target.value)}
            />

            <CheckboxSelect
              value={portfolioData.techStack}
              onChange={stack => handleChangeForm('techStack', stack)}
            />
          </div>
        </section>

        <section className={S['sec']}>
          <h3 className="a11y-hidden">포트폴리오 소개</h3>
          <div className={S['sec__form']}>
            <Textarea
              id="exText"
              label="포트폴리오 소개"
              onChange={e => handleChangeForm('content', e.target.value)}
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
                className={S['input-wrap']}
                onChange={e => handleChangeForm('linkUrl', e.target.value)}
              />
            </div>

            <FileUploader
              id="exIdFileUpload"
              onChange={files =>
                handleChangeForm('imageUrls', files)
              }></FileUploader>
          </div>
        </section>
      </form>
    </div>
  )
}
