import type { AuthData, AuthProvider } from '@/types/auth'
import supabase from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { signInWith } from '@/utils/actions'

export const useAuthLogin = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null)

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

  const getSession = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession()
    if (session?.user) {
      setAuthData({
        name: session.user.user_metadata.name,
        email: session.user.user_metadata.email,
        user_name: session.user.user_metadata.user_name,
        avatar_url: session.user.user_metadata.avatar_url,
        provider: session.user.app_metadata.provider || ''
      })
    }
  }

  useEffect(() => {
    getSession()
  }, [])

  return { authData, handleSignIn, handleSignOut }
}
