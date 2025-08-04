import { useContext } from 'react'
import { addThreads, fetchThreads } from '@/apis/dm/threads.controller'
import { AuthContext } from '@/context/auth/AuthContext'
import supabase from '@/lib/supabaseClient'
import { alertError, alertSuccess } from '@/utils/alertUtils'

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
          lastMessageTime: lastMessage?.[0]?.createdat,
          myId: authData?.id ?? '',
          otherId: otherUserId,
          isUserA: isUserA
        }
      })
    )

    // 마지막 메시지 시간 순으로 정렬
    const sortedThreadList = threadList.sort((a, b) => {
      if (!a.lastMessageTime) return 1 // 메시지 없는 채팅방은 맨 뒤로
      if (!b.lastMessageTime) return -1
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      )
    })

    return sortedThreadList
  }

  const handleAddThreads = async (otherUserId: string) => {
    if (!authData?.id) {
      alertError({
        title: '채팅방 생성 실패',
        text: '로그인이 필요합니다.',
        icon: 'error'
      })
      return
    }

    if (authData?.id === otherUserId) {
      alertError({
        title: '채팅방 생성 실패',
        text: '자기자신은 채팅할 수 없습니다.',
      })
      return
    }

    const existingThreads = await addThreads(
      authData?.id ?? '',
      otherUserId,
      new Date().toISOString()
    )
    if (existingThreads && existingThreads.length > 0) {
      return alertError({
        title: '채팅방 생성 실패',
        text: '이미 존재하는 채팅방입니다.',
      })
    }

    alertSuccess({
      title: '채팅방 생성 완료',
      text: '채팅방이 생성되었습니다.',
    })
  }

  return { handleFetchThreads, handleAddThreads }
}
