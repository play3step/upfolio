import supabase from '@/lib/supabaseClient'
import type { BookmarkAndLiked } from '@/types/mypage'

export const fetchBookmarks = async (
  userId: string
): Promise<BookmarkAndLiked[]> => {
  const { data: bookmarkData, error: bookmarkError } = await supabase
    .from('BookMark')
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

  if (bookmarkError) {
    throw new Error(
      `북마크 데이터를 가져오는 중 오류 발생: ${bookmarkError.message}`
    )
  }

  const fixedBookmarks: BookmarkAndLiked[] = bookmarkData
    ? bookmarkData.map(item => {
        const bookmark = Array.isArray(item.PortfolioWithLikes)
          ? item.PortfolioWithLikes[0] // 배열이면 첫 번째 값
          : item.PortfolioWithLikes // 아니면 그냥 사용

        return {
          portfolioid: item.portfolioid,
          Portfolio: {
            id: bookmark.id,
            title: bookmark.title,
            content: bookmark.content,
            createdAt: bookmark.createdAt,
            likeCount: bookmark.likeCount
          }
        }
      })
    : []

  // 최신순 정렬
  fixedBookmarks.sort(
    (a, b) =>
      new Date(b.Portfolio.createdAt).getTime() -
      new Date(a.Portfolio.createdAt).getTime()
  )

  return fixedBookmarks
}
