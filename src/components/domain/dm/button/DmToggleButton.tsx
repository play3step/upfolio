import S from './DmToggleButton.module.css'
import dmIcon from '@/assets/icon/dm.svg'
import closeIcon from '@/assets/icon/delete.svg'

interface Props {
  isOpen: boolean
  handleToggle: () => void
}

export default function DmToggleButton({ isOpen, handleToggle }: Props) {
  return (
    <button
      className={S['dm-buatton']}
      onClick={handleToggle}>
      <img
        src={isOpen ? closeIcon : dmIcon}
        alt="DM"
        className={S['dm-button-icon']}
      />
    </button>
  )
}
