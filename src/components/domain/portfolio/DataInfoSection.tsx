import NewPortfolioStyle from '@/pages/Portfolio/NewPortfolio.module.css'
import S from './DataInfoSection.module.css'
import Input from '@/components/common/Input'
import type { IIntroInfoSection } from '@/types/portfolio'
import FileUploader from '@/components/common/FileUploader'

function DataInfoSection({
  portfolioData,
  handleChangeForm,
  errors
}: IIntroInfoSection) {
  return (
    <section className={NewPortfolioStyle['sec']}>
      <h3 className={NewPortfolioStyle['sec__tit']}>포트폴리오 자료</h3>
      <div className={NewPortfolioStyle['sec__form']}>
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
  )
}
export default DataInfoSection
