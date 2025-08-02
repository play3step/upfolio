import type { TempItem } from '@/types/portfolio'
import S from './SideTempList.module.css'
import { formatDate } from '@/utils/format'
import { useEffect, useRef } from 'react'

interface Props {
  isOpen: boolean
  isClose: () => void
  tempList: TempItem[]
  onSelect: (tempItemId: string) => void
  onDelete: (tempItemId: string) => void
}

function SideTempList({
  isOpen,
  isClose,
  tempList,
  onSelect,
  onDelete
}: Props) {
  const sideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      sideRef.current?.focus()
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`${S['overlay']} ${isOpen ? S.show : ''}`}
        onClick={isClose}></div>
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={isOpen ? 0 : -1}
        className={`${S['side']} ${isOpen ? S.open : ''}`}
        ref={sideRef}>
        <div className={S['side__tit']}>
          <h2>임시저장 목록</h2>
        </div>
        <div className={S['side__cont']}>
          <ul className={S['side__list']}>
            {tempList.map(item => (
              <li key={item.id}>
                <div
                  onClick={() => onSelect(item.id)}
                  className={S['side__list__item']}>
                  <strong className={`${S['tit']} ${'ellipsis'}`}>
                    {item.title}
                  </strong>
                  <span className={S['side__list__date']}>
                    {formatDate(item.createdAt)}
                  </span>
                  <button
                    type="button"
                    aria-label="삭제"
                    onClick={e => {
                      e.stopPropagation()
                      onDelete(item.id)
                    }}
                    className={S['side__list__delBtn']}></button>
                </div>
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
