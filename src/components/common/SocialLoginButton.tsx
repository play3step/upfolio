import S from '@/pages/Auth/Login.module.css'
import googleIcon from '@/assets/icon/google.svg'
import githubIcon from '@/assets/icon/github.svg'

type SocialProvider = 'google' | 'github'

interface SocialLoginButtonProps {
  provider: SocialProvider
  onClick?: () => void
}

const PROVIDER_CONFIG = {
  google: {
    icon: googleIcon,
    alt: 'Google Icon',
    text: 'Google로 로그인'
  },
  github: {
    icon: githubIcon,
    alt: 'GitHub Icon',
    text: 'GitHub로 로그인'
  }
} as const

export function SocialLoginButton({
  provider,
  onClick
}: SocialLoginButtonProps) {
  const config = PROVIDER_CONFIG[provider]

  return (
    <button
      className={S['login__button']}
      onClick={onClick}>
      <img
        src={config.icon}
        alt={config.alt}
        className={S['login__button--icon']}
      />
      {config.text}
    </button>
  )
}
export default SocialLoginButton
