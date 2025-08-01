import Textarea from '@/components/common/Textarea'
import NewPortfolioStyle from '@/pages/Portfolio/NewPortfolio.module.css'
import type { IIntroInfoSection } from '@/types/portfolio'

function IntroInfoSection({
  portfolioData,
  handleChangeForm,
  errors
}: IIntroInfoSection) {
  return (
    <section className={NewPortfolioStyle['sec']}>
      <h3 className="a11y-hidden">포트폴리오 소개</h3>
      <div className={NewPortfolioStyle['sec__form']}>
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
  )
}
export default IntroInfoSection
