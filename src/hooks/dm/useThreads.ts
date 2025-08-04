import { useContext } from 'react'
import { addThreads, fetchThreads } from '@/apis/dm/threads.controller'
import { AuthContext } from '@/context/auth/AuthContext'

import supabase from '@/lib/supabaseClient'

interface ThreadType {
  id: string
  name: string
  profile: string
  lastMessage: string
  myId: string
  otherId: string
  isUserA: boolean
}

export const useThreads = () => {
  const { authData } = useContext(AuthContext)

  const handleFetchThreads = async (): Promise<ThreadType[]> => {
    const threads = await fetchThreads(authData?.id ?? '')

    if (!threads) {
      return []
    }

    const threadList = await Promise.all(
      threads.map(async d => {
        const otherUserId = d.useraid === authData?.id ? d.userbid : d.useraid

        const { data: otherUser } = await supabase
          .from('User')
          .select('*')
          .eq('id', otherUserId)
          .single()

        const { data: lastMessage } = await supabase
          .from('DMMessage')
          .select('*')
          .eq('threadid', d.id)
          .order('createdat', { ascending: false })
          .limit(1)

        const isUserA = d.useraid === authData?.id
        return {
          id: d.id,
          name: otherUser?.nickname,
          profile: otherUser?.profileimage,
          lastMessage: lastMessage?.[0]?.message,
          myId: authData?.id ?? '',
          otherId: otherUserId,
          isUserA: isUserA
        }
      })
    )

    return threadList
  }

  const handleAddThreads = async (otherUserId: string) => {
    if (authData?.id === otherUserId) {
      return alert('자기자신은 채팅할 수 없습니다.')
    }

    await addThreads(authData?.id ?? '', otherUserId, new Date().toISOString())
  }

  return { handleFetchThreads, handleAddThreads }
}
