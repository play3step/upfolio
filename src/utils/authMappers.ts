import type { UserData, AuthData } from '@/types/auth'

export const mapUserDataToAuthData = (user: UserData): AuthData => ({
  id: user.id,
  name: user.nickname,
  email: user.email,
  avatar_url: user.profileimage
})
