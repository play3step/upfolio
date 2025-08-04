import { useContext } from 'react'
import S from './DmToggleButton.module.css'
import { DmContext } from '@/context/dm/DmContext'
import dmIcon from '@/assets/icon/dm.svg'
import closeIcon from '@/assets/icon/delete.svg'

export default function DmToggleButton() {
  const { dm, toggleDm } = useContext(DmContext)

  return (
    <button
      className={S['dm-buatton']}
      onClick={toggleDm}>
      <img
        src={dm ? closeIcon : dmIcon}
        alt="DM"
        className={S['dm-button-icon']}
      />
    </button>
  )
}
