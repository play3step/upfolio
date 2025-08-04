import supabase from '@/lib/supabaseClient'
import type { AuthProvider } from '@/types/auth'

const signInWith = async (provider: AuthProvider) => {
  const redirectTo =
    typeof window !== 'undefined'
      ? window.location.origin
      : import.meta.env.VITE_REDIRECT_URL

  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: false
    }
  })
}

export { signInWith }
