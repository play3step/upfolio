import { useContext } from 'react'
import { addThreads, fetchThreads } from '@/apis/dm/threads.controller'
import { AuthContext } from '@/context/auth/AuthContext'

import supabase from '@/lib/supabaseClient'
import { alertWarning } from '@/utils/alertUtils'

interface ThreadType {
  id: string
  name: string
  profile: string
  lastMessage: string
  senderid: string
  receiverid: string
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
        const { data: userB } = await supabase
          .from('User')
          .select('*')
          .eq('id', d.userbid)
          .single()

        const { data: lastMessage } = await supabase
          .from('DMMessage')
          .select('*')
          .eq('threadid', d.id)
          .order('createdat', { ascending: false })
          .limit(1)
        return {
          id: d.id,
          name: userB?.nickname,
          profile: userB?.profileimage,
          lastMessage: lastMessage?.[0]?.message,
          senderid: d.useraid,
          receiverid: d.userbid
        }
      })
    )

    return threadList
  }

  const handleAddThreads = async (otherUserId: string) => {
    if (authData?.id === otherUserId) {
      return alertWarning({ text: '자기자신은 채팅할 수 없습니다.' })
    }
    const threads = await addThreads(
      authData?.id ?? '',
      otherUserId,
      new Date().toISOString()
    )
    console.log(threads)
  }

  return { handleFetchThreads, handleAddThreads }
}
