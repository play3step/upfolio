import supabase from '@/lib/supabaseClient'
import type { AuthProvider } from '@/types/auth'

const signInWith = async (provider: AuthProvider) => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:5173/'
    }
  })
}

export { signInWith }
