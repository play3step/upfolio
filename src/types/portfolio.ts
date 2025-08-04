export interface PortfolioItem {
  id: string
  userId: string
  title: string
  content: string
  fileList: { name: string; url: string }[]
  interest: { label: string; value: string }
  career: { label: string; value: string }
  isBookmarked: boolean
  linkUrl: string
  createdAt: string
  viewCount: number
  techStack: string[]
  email: string
  name: string
  phone: string
  profileImage: string
  birthDate: string
}

export interface PortfolioData {
  id?: string
  userId: string
  profileImage: string
  name: string
  birthDate: string
  phone: string
  email: string
  title: string
  content: string
  career: { label: string; value: string }
  interest: { label: string; value: string }
  techStack: string[]
  linkUrl: string
  fileList: { name: string; url: string }[]
  viewCount?: number
  createdAt?: string
}

export interface UserInfo {
  id: string
  email: string
  nickname: string
  phone?: string
  birthDate?: string
}

export type ValidationError = Partial<Record<keyof PortfolioData, string>>

export interface TempItem {
  id: string
  title: string
  createdAt: string
}

export interface IBasicInfoSection {
  portfolioData: PortfolioData
  handleChangeForm: <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => void
}

export interface ITechInfoSection {
  portfolioData: PortfolioData
  handleChangeForm: <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => void
  handleChangeRadio: (
    key: 'career' | 'interest',
    value: string,
    options: { label: string; value: string }[]
  ) => void
  errors: ValidationError
}

export interface IIntroInfoSection {
  portfolioData: PortfolioData
  handleChangeForm: <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => void
  errors: ValidationError
}
