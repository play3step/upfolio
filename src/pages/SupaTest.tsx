import { useAuthLogin } from '@/hooks/auth/useAuthLogin'

function SupaTest() {
  const { authData, handleSignIn, handleSignOut } = useAuthLogin()

  return (
    <>
      <div>
        <button onClick={() => handleSignIn('google')}>구글 로그인</button>
        <button onClick={() => handleSignIn('github')}>깃허브 로그인</button>
        <button onClick={handleSignOut}>로그아웃</button>
        {authData && (
          <div>
            <p>이름: {authData.name}</p>
            <p>이메일: {authData.email}</p>
            <p>유저네임: {authData.user_name}</p>
            <p>
              아바타: {authData.avatar_url}
              <img
                src={authData.avatar_url}
                alt="avatar"
              />
            </p>
            <p>프로바이더: {authData.provider}</p>
          </div>
        )}
      </div>
    </>
  )
}
export default SupaTest
