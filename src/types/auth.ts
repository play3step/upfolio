export type AuthProvider = 'google' | 'github'

export interface AuthData {
  name: string
  email: string
  user_name: string
  avatar_url: string
  provider: string
}
