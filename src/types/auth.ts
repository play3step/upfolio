export type AuthProvider = 'google' | 'github'

export interface AuthData {
  id: string
  name: string
  email: string
  avatar_url: string
}

export interface UserData {
  id: string
  email: string
  nickname: string
  profileimage: string
  interest?: string
  techstack?: string[]
  createdat?: string
  career?: string
}

export interface AuthContextType {
  login: (userData: AuthData) => void
  logout: () => void
  isAuthenticated: boolean
  authData: AuthData | null
}
