import { useContext, useEffect, useState } from 'react'
import { addComment, fetchComments } from '@/apis/portfolio/comment.controller'

import { AuthContext } from '@/context/auth/AuthContext'

interface CommentType {
  id: string
  content: string
  profileimage: string
  createdat: string
  portfolioid: string
  userid: string
  nickname: string
}

export const useComment = (portfolioId: string) => {
  const [comments, setComments] = useState<CommentType[]>([])
  const { authData } = useContext(AuthContext)

  const sendComment = async (inputValue: string) => {
    if (!inputValue.trim()) return
    if (!authData?.id || !authData?.nickname) return

    const newComment = {
      id: crypto.randomUUID(),
      content: inputValue.trim(),
      profileimage: authData?.profileimage || '',
      createdat: new Date().toISOString(),
      portfolioid: portfolioId,
      userid: authData.id,
      nickname: authData.nickname
    }

    await addComment(newComment)

    setComments(prev => [...prev, newComment])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComments(portfolioId)
        setComments(data || [])
      } catch (error) {
        console.error('댓글 데이터를 가져오는 중 오류 발생: ', error)
      }
    }
    fetchData()
  }, [])

  return { comments, sendComment }
}
