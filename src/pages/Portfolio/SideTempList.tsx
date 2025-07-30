import Button from '@/components/common/Button'
import S from './SideTempList.module.css'

interface Props {
  isOpen: boolean
  isClose: () => void
  onSave: () => void
}

function SideTempList({ isOpen, isClose, onSave }: Props) {
  return (
    <>
      <div
        className={`${S['overlay']} ${isOpen ? S.show : ''}`}
        onClick={isClose}></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`${S['side']} ${isOpen ? S.open : ''}`}>
        <div className={S['side__tit']}>
          <h2>임시저장 목록</h2>
          <Button
            children="임시저장"
            className={S['side__tempBtn']}
            onClick={onSave}
          />
        </div>
        <div className={S['side__cont']}>
          <ul className={S['side__list']}>
            <li>
              <button type="button">
                <strong className={`${S['tit']} ${'ellipsis'}`}>
                  포트폴리오 제목 포트폴리오 제목포트폴리오 제목포트폴리오
                  제목포트폴리오 제목
                </strong>
                <span className={S['side__list__date']}>2025.04.30</span>
              </button>
            </li>
          </ul>
        </div>
        <button
          aria-label="팝업 닫기"
          className={S['side__closeBtn']}
          onClick={isClose}
        />
      </div>
    </>
  )
}
export default SideTempList
