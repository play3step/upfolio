import supabase from '@/lib/supabaseClient'
import { alertWarning } from '@/utils/alertUtils'

const fetchThreads = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  const { data, error } = await supabase
    .from('DMThread')
    .select('*')
    .or(`useraid.eq.${userId},userbid.eq.${userId}`)

  if (error) {
    throw error
  }
  return data
}

const addThreads = async (
  userId: string,
  otherUserId: string,
  createdAt: string
) => {
  const { data: userA } = await supabase
    .from('User')
    .select('*')
    .eq('id', userId)
    .single()

  const { data: userB } = await supabase
    .from('User')
    .select('*')
    .eq('id', otherUserId)
    .single()

  if (!userA || !userB) {
    throw new Error('User not found')
  }

  const { data: searchThread } = await supabase
    .from('DMThread')
    .select('*')
    .or(
      `and(useraid.eq.${userA.id},userbid.eq.${userB.id}),and(useraid.eq.${userB.id},userbid.eq.${userA.id})`
    )
    .single()

  if (searchThread) {
    return alertWarning({ text: '이미 존재하는 채팅방입니다.' })
  }

  const { data, error } = await supabase.from('DMThread').insert({
    useraid: userA.id,
    userbid: userB.id,
    createdat: createdAt
  })
  if (error) {
    throw error
  }
  return data
}
export { fetchThreads, addThreads }
