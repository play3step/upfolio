import CheckboxSelect from '@/components/common/CheckboxSelect'
import RadioGroup from '@/components/common/RadioGroup'
import NewPortfolioStyle from '@/pages/Portfolio/NewPortfolio.module.css'
import type { ITechInfoSection } from '@/types/portfolio'

function TechProfileSection({
  portfolioData,
  handleChangeRadio,
  handleChangeForm,
  errors
}: ITechInfoSection) {
  /* --- 경력 수준 라디오 그룹 상태 및 옵션 --- */
  const CAREER_SELECT = [
    { label: '신입 (0년)', value: 'zeroYear' },
    { label: '1년차 이상', value: 'oneYearsPlus' },
    { label: '3년차 이상', value: 'threeYearsPlus' },
    { label: '5년차 이상', value: 'fiveYearsPlus' },
    { label: '10년차 이상', value: 'tenYearsPlus' }
  ]

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

  return (
    <section className={NewPortfolioStyle['sec']}>
      <h3 className="a11y-hidden">지원분야 / 경력 수준 / 기술 스택</h3>
      <div className={NewPortfolioStyle['sec__form']}>
        <RadioGroup
          label="경력수준"
          name="careerOption"
          options={CAREER_SELECT}
          checked={portfolioData.career.value}
          onChange={e =>
            handleChangeRadio('career', e.target.value, CAREER_SELECT)
          }
          error={errors.career}
        />

        <RadioGroup
          label="지원분야"
          name="fieldOfSupport"
          options={INTEREST_SELECT}
          checked={portfolioData.interest.value}
          onChange={e =>
            handleChangeRadio('interest', e.target.value, INTEREST_SELECT)
          }
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
  )
}
export default TechProfileSection
