import supabase from '@/lib/supabaseClient'
import type { AuthData } from '@/types/auth'

export const loginUser = async (authData: AuthData) => {
  // 1. 먼저 사용자 조회
  const { data: existingUser, error: fetchError } = await supabase
    .from('User')
    .select('*')
    .eq('id', authData.id)
    .single()

  // 2. 사용자가 없으면 회원가입
  if (fetchError?.code === 'PGRST116') {
    const { data: newUser, error: insertError } = await supabase
      .from('User')
      .insert({
        id: authData.id,
        email: authData.email,
        nickname: authData.name,
        profileimage: authData.avatar_url,
        interest: '',
        techstack: [],
        createdat: new Date().toISOString(),
        career: ''
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return newUser
  }

  if (fetchError) {
    throw fetchError
  }

  return existingUser
}
