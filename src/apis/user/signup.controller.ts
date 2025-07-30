import supabase from '@/lib/supabaseClient'

export const signupUser = async (
  phone: string,
  birthDate: string,
  id: string
) => {
  const existing = await supabase.from('User').select('*').eq('id', id).single()

  if (existing.error && existing.error.code !== 'PGRST116') {
    throw existing.error
  }

  if (existing.data) {
    return await supabase.from('User').update({ phone, birthDate }).eq('id', id)
  }
}
