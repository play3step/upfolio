import supabase from '@/lib/supabaseClient'
import type { UserProfile } from '@/types/mypage'

// 현재 로그인한 사용자의 ID 가져오기
export const getCurrentUserId = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    console.error('사용자 인증 정보가 없습니다.', error)
    return null
  }

  return data.user.id
}

// 사용자 프로필 정보 가져오기
export const fetchUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  if (!userId) return null

  const { data, error } = await supabase
    .from('User')
    .select('id, email, nickname, phone, birthDate, profileimage')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('프로필 정보를 가져오는데 실패했습니다:', error)
    return null
  }

  return data
}

// 사용자 프로필 업데이트하기
export const updateUserProfile = async (
  userId: string,
  profileData: Partial<UserProfile>
): Promise<UserProfile | null> => {
  if (!userId) return null

  const { error } = await supabase
    .from('User')
    .update(profileData)
    .eq('id', userId)

  if (error) {
    console.error('프로필 정보 업데이트에 실패했습니다:', error)
    throw new Error('프로필 정보 업데이트에 실패했습니다.')
  }

  // 업데이트된 프로필 정보 가져오기
  return fetchUserProfile(userId)
}

// 댓글의 프로필 이미지 업데이트
export const updateCommentProfileImage = async (
  userId: string,
  oldProfileImage: string | undefined | null,
  newProfileImage: string | null
): Promise<void> => {
  if (!userId || oldProfileImage === newProfileImage) return

  const { error } = await supabase
    .from('Comment')
    .update({ profileimage: newProfileImage })
    .eq('profileimage', oldProfileImage)
    .eq('userid', userId)

  if (error) {
    console.error('댓글 프로필 이미지 업데이트에 실패했습니다:', error)
    throw new Error('댓글 프로필 이미지 업데이트에 실패했습니다.')
  }
}
