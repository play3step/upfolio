import { signInWithGoogle } from '@/utils/actions'
import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

interface UserData {
  name?: string
  email?: string
  user_name?: string
  avatar_url?: string
  provider?: string
}

function SupaTest() {
  const googleLogin = signInWithGoogle
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      if (session?.user) {
        setUserData({
          name: session.user.user_metadata.name,
          email: session.user.user_metadata.email,
          user_name: session.user.user_metadata.user_name,
          avatar_url: session.user.user_metadata.avatar_url,
          provider: session.user.app_metadata.provider
        })
      }
    }

    getSession()
  }, [])

  const handleSignIn = async () => {
    await googleLogin()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserData(null)
  }

  return (
    <>
      <div>
        <button onClick={handleSignIn}>구글 로그인</button>
        <button onClick={handleSignOut}>로그아웃</button>
        {userData && (
          <div>
            <p>이름: {userData.name}</p>
            <p>이메일: {userData.email}</p>
            <p>유저네임: {userData.user_name}</p>
            <p>
              아바타: {userData.avatar_url}
              <img
                src={userData.avatar_url}
                alt="avatar"
              />
            </p>
            <p>프로바이더: {userData.provider}</p>
          </div>
        )}
      </div>
    </>
  )
}
export default SupaTest
