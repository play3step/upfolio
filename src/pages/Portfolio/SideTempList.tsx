import type { TempItem } from '@/types/portfolio'
import S from './SideTempList.module.css'
import { formatDate } from '@/utils/formatDate'

interface Props {
  isOpen: boolean
  isClose: () => void
  tempList: TempItem[]
}

function SideTempList({ isOpen, isClose, tempList }: Props) {
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
        </div>
        <div className={S['side__cont']}>
          <ul className={S['side__list']}>
            {tempList.map(item => (
              <li key={item.id}>
                <button type="button">
                  <strong className={`${S['tit']} ${'ellipsis'}`}>
                    {item.title}
                  </strong>
                  <span className={S['side__list__date']}>
                    {formatDate(item.updatedAt)}
                  </span>
                </button>
              </li>
            ))}
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
