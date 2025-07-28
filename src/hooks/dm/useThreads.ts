import { useContext, useState } from 'react'
import { addThreads, fetchThreads } from '@/apis/dm/threads.controller'
import { AuthContext } from '@/context/AuthContext'
import type { Thread } from '@/types/thread'
import supabase from '@/lib/supabaseClient'

export const useThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([])

  const { authData } = useContext(AuthContext)

  const handleFetchThreads = async () => {
    const threads = await fetchThreads(authData?.id ?? '')

    if (!threads) {
      return
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
          lastMessage: lastMessage?.[0]?.message
        }
      })
    )

    setThreads(threadList)
  }

  const handleAddThreads = async (otherUserId: string) => {
    const threads = await addThreads(
      authData?.id ?? '',
      otherUserId,
      new Date().toISOString()
    )
    console.log(threads)
  }

  return { threads, handleFetchThreads, handleAddThreads }
}
