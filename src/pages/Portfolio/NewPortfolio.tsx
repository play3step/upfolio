import Button from '@/components/common/Button'
import S from './NewPortfolio.module.css'
import defaultProfile from '../../assets/images/default-profile.png'
import Input from '@/components/common/Input'

export const NewPortfolio = () => {
  return (
    <div className={S.container}>
      <div className="tit-withBtn">
        <h2 className="tit__txt">포트폴리오 등록</h2>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <Button line>임시저장</Button>
          <Button>저장</Button>
        </div>
      </div>

      <form>
        <section className={S['sec']}>
          <h3 className="a11y-hidden">기본정보</h3>
          <div className={S['sec__profile']}>
            <img
              src={defaultProfile}
              alt="00님의 포트폴리오 사진"
            />

            <dl className={S['sec__profile__info']}>
              <dt className="a11y-hidden">이름</dt>
              <dd>홍길동</dd>

              <dt className="a11y-hidden">생년월일</dt>
              <dd>1997.12.25</dd>
            </dl>
          </div>

          <div className={S.sec__form}>
            <Input
              id="exId01"
              label="이메일"
              value="example@github.com"
              readOnly
            />

            <Input
              type="tel"
              id="exId02"
              label="전화번호"
              value="010-1234-5678"
              readOnly
              className={S.hi}
            />
          </div>
        </section>
      </form>
    </div>
  )
}
