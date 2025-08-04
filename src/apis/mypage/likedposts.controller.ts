import supabase from '@/lib/supabaseClient'
import type { BookmarkAndLiked } from '@/types/mypage'

export const fetchLikedPosts = async (
  userId: string
): Promise<BookmarkAndLiked[]> => {
  const { data: likedCommentData, error: likedCommentError } = await supabase
    .from('like_table')
    .select(
      `
          portfolioid,
          PortfolioWithLikes(
            id,
            title,
            content,
            createdAt,
            likeCount
          )
        `
    )
    .eq('userid', userId)

  if (likedCommentError) {
    throw new Error(
      `좋아요한 글 데이터를 가져오는 중 오류 발생: ${likedCommentError.message}`
    )
  }
  const fixedLikedPortfolios: BookmarkAndLiked[] = likedCommentData
    ? likedCommentData.map(item => {
        const likedPortfolio = Array.isArray(item.PortfolioWithLikes)
          ? item.PortfolioWithLikes[0]
          : item.PortfolioWithLikes

        return {
          portfolioid: item.portfolioid,
          Portfolio: {
            id: likedPortfolio.id,
            title: likedPortfolio.title,
            content: likedPortfolio.content,
            createdAt: likedPortfolio.createdAt,
            likeCount: likedPortfolio.likeCount
          }
        }
      })
    : []

  // 좋아요 많은 순 정렬
  fixedLikedPortfolios.sort(
    (a, b) => b.Portfolio.likeCount - a.Portfolio.likeCount
  )

  return fixedLikedPortfolios
}
