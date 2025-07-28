import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import S from './PortfolioDetail.module.css'
import defaultProfileImage from '@/assets/images/default-profile.png'
import Button from '@/components/common/Button'

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

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>()
  const decodedId = decodeURIComponent(id ?? '')
  const [data, setData] = useState<PortfolioData | null>(null)
  const [activeButton, setActiveButton] = useState('기본 정보')

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName)
  }

  useEffect(() => {
    if (!decodedId) return
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('Portfolio2')
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
      <nav className={S.nav}>
        <Button
          children="기본 정보"
          className={
            activeButton === '기본 정보' ? S.activeButton : S.inactiveButton
          }
          onClick={() => handleButtonClick('기본 정보')}
        />
        <Button
          children="지원 분야 / 기술 스택"
          className={
            activeButton === '지원 분야 / 기술 스택'
              ? S.activeButton
              : S.inactiveButton
          }
          onClick={() => handleButtonClick('지원 분야 / 기술 스택')}
        />
        <Button
          children="포트폴리오 소개"    
          className={
            activeButton === '포트폴리오 소개'
              ? S.activeButton
              : S.inactiveButton
          }
          onClick={() => handleButtonClick('포트폴리오 소개')}
        />
        <Button
          children="포트폴리오 자료"
          className={
            activeButton === '포트폴리오 자료'
              ? S.activeButton
              : S.inactiveButton
          }
          onClick={() => handleButtonClick('포트폴리오 자료')}
        />
      </nav>
      <div className={S.detailWrapper}>
        <h1 className={S.title}>{data.title}</h1>

        <section className={S.profile}>
          <img
            src={data.profileimage ? data.profileimage : defaultProfileImage}
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

        <hr />

        <section className={S.interestStack}>
          <h3>지원 분야</h3>
          <div className={S.interest}>
            <p>{data.interest}</p>
          </div>

          <h3>경력</h3>
          <p>{data.career === 'junior' ? '신입' : '경력'}</p>

          <h3>기술 스택</h3>
          <p>{data.techStack.join(' | ')}</p>
        </section>

        <hr />

        <section className={S.description}>
          <h3>소개</h3>
          <p>{data.content}</p>
        </section>

        <hr />

        <section className={S.urlFile}>
          <h3>포트폴리오 자료</h3>
          <h3>URL</h3>
          <a
            href={
              data.linkUrl.startsWith('http')
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
  )
}
