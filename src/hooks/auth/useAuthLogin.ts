import type { AuthProvider, UserData } from '@/types/auth'
import supabase from '@/lib/supabaseClient'
import { useState } from 'react'
import { signInWith } from '@/utils/actions'
import { loginUser } from '@/apis/user/user.controller'

export const useAuthLogin = () => {
  const [authData, setAuthData] = useState<UserData | null>(null)

  const handleSignIn = async (provider: AuthProvider) => {
    const { error } = await signInWith(provider)
    if (error) {
      console.error('로그인 에러:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setAuthData(null)
  }

  const getSession = async (): Promise<UserData | null> => {
    console.log('getSession 호출됨')
    const {
      data: { session }
    } = await supabase.auth.getSession()
    console.log('session:', session)
    if (session?.user) {
      const authData = {
        id: session.user.id,
        name: session.user.user_metadata.name,
        email: session.user.email ?? '',
        avatar_url: session.user.user_metadata.avatar_url
      }
      const user = await loginUser(authData)
      setAuthData(user)

      return user
    }
    return null
  }

  return { authData, handleSignIn, handleSignOut, getSession }
}
