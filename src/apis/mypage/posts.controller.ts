import supabase from '@/lib/supabaseClient'
import type { Post } from '@/types/mypage'

export const fetchPosts = async (userId: string): Promise<Post[]> => {
  const { data: postData, error: postError } = await supabase
    // .from('Portfolio')
    .from('PortfolioWithLikes')
    .select('id, title, content, createdAt, likeCount, viewCount')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
    .order('id', { ascending: false })

  if (postError) {
    console.error('Error fetching posts:', postError)
    return []
  }

  return postData || []
}
