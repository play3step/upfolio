import { SocialLoginButton } from '@/components/common/SocialLoginButton'
import S from './Login.module.css'
import arrowBack from '../../assets/icon/arrow-back.svg'
import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

export function Login() {
  const { handleSignIn } = useAuthLogin()
  return (
    <div className={S['login']}>
      <div className={S['login__card']}>
        <button
          className={S['login__button--back']}
          type="button"
          onClick={() => window.history.back()}>
          <img
            src={arrowBack}
            alt="뒤로가기"
          />
        </button>
        <h2 className={S['login__title']}>로그인</h2>
        <p className={S['login__description']}>
          깃허브 또는 구글 계정으로
          <br />
          간편하게 가입 후<br />
          Upfolio의 다양한 기능을 이용해 보세요.
        </p>
        <div className={S['login__buttons']}>
          <SocialLoginButton
            provider="google"
            onClick={() => handleSignIn('google')}
          />
          <SocialLoginButton
            provider="github"
            onClick={() => handleSignIn('github')}
          />
        </div>
      </div>
    </div>
  )
}
