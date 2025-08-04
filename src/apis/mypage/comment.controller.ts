import supabase from '@/lib/supabaseClient'
import type { Comment } from '@/types/mypage'

export const fetchComments = async (userId: string): Promise<Comment[]> => {
  const { data: commentData, error: commentError } = await supabase
    .from('Comment')
    .select('id, portfolioid, userid, content, createdat')
    .eq('userid', userId)
    .order('createdat', { ascending: true })
    .order('id', { ascending: false })

  if (commentError) {
    console.error('댓글 목록을 가져오는 중 오류 발생:', commentError.message)
    return []
  }

  return commentData || []
}
