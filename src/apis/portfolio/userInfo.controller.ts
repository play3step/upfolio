import supabase from '@/lib/supabaseClient'

export const getUserInfo = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.error('유저 정보 불러오기 실패:', error)
    return
  }

  if (user && user.email) {
    return { id: user.id, email: user.email }
  }

  return null
}
