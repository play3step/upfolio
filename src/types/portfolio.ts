export interface PortfolioItem {
  id: string
  userId: string
  title: string
  content: string
  fileList: string[]
  interest: string
  career: string
  isBookmarked: boolean
  linkUrl: string
  createdAt: string
  viewCount: number
  likeCount: number
  techStack: string[]
  email: string
  name: string
  phone: string
  profileImage: string
  birthDate: string
}

export interface PortfolioData {
  id: string
  userId: string
  profileImage: string
  name: string
  birthDate: string
  phone: string
  email: string
  title: string
  content: string
  career: string
  interest: string
  techStack: string[]
  linkUrl: string
  fileList: { name: string; url: string }[]
  viewCount?: number
  likeCount?: number
}

export interface UserInfo {
  id: string
  email: string
}

export type ValidationError = Partial<Record<keyof PortfolioData, string>>
