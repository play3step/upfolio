import supabase from '@/lib/supabaseClient'

const signInWith = async (provider: 'google' | 'github') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: 'http://localhost:5173/'
    }
  })
  console.log(data, error)
}

const signInWithGoogle = () => signInWith('google')

export { signInWithGoogle }
