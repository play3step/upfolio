import supabase from '@/lib/supabaseClient'

const fetchThreads = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  const { data, error } = await supabase
    .from('DMThread')
    .select('*')
    .or('useraid.eq.' + userId + ',userbid.eq.' + userId)

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

  const { data: existingThreads } = await supabase
    .from('DMThread')
    .select('*')
    .or(
      `and(useraid.eq.${userId},userbid.eq.${otherUserId}),and(useraid.eq.${otherUserId},userbid.eq.${userId})`
    )

  if (existingThreads && existingThreads.length > 0) {
    return existingThreads
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
