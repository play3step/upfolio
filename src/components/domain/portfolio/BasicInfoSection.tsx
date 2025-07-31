import NewPortfolioStyle from '@/pages/Portfolio/NewPortfolio.module.css'
import S from './BasicInfoSection.module.css'
import ImageUploader from '@/components/common/ImageUploader'
import Input from '@/components/common/Input'
import type { IBasicInfoSection } from '@/types/portfolio'

function BasicInfoSection({
  portfolioData,
  handleChangeForm
}: IBasicInfoSection) {
  return (
    <section className={NewPortfolioStyle['sec']}>
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
  )
}
export default BasicInfoSection
