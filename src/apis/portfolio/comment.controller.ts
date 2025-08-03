import supabase from '@/lib/supabaseClient'

interface CommentType {
  id: string
  content: string
  profileimage: string
  createdat: string
  portfolioid: string
  userid: string
  nickname: string
}

export const fetchComments = async (portfolioId: string) => {
  const { data, error } = await supabase
    .from('Comment')
    .select('*')
    .eq('portfolioid', portfolioId)
    .order('createdat', { ascending: true })

  if (error) {
    console.error('댓글 불러오기 실패:', error.message)
    return
  }

  return data
}

export const addComment = async (newComment: CommentType) => {
  const { data, error } = await supabase.from('Comment').insert([newComment])

  if (error) {
    console.error('댓글 전송 실패:', error.message)
    return
  }

  return data
}
