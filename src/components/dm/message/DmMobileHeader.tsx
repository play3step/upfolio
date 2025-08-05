import styles from './DmMobileHeader.module.css'
import arrowBack from '@/assets/icon/arrow-back.svg'

interface DmMobileHeaderProps {
  onBackClick: () => void
  username: string
  profileImage: string
}

export default function DmMobileHeader({
  onBackClick,
  username,
  profileImage
}: DmMobileHeaderProps) {
  return (
    <div className={styles['dm-mobile-header']}>
      <button
        type="button"
        className={styles['back-button']}
        onClick={onBackClick}
        aria-label="뒤로 가기">
        <img
          src={arrowBack}
          alt="뒤로 가기"
        />
      </button>
      <div className={styles['user-info']}>
        <img
          src={profileImage || '/src/assets/images/default-profile.png'}
          alt={`${username} 프로필`}
          className={styles['profile-image']}
        />
        <span className={styles.username}>{username}</span>
      </div>
    </div>
  )
}
