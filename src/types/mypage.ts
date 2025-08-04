export interface UserProfile {
  id: string
  nickname: string
  phone: string
  birthDate: string
  email: string
  profileimage: string
}

export interface BookmarkAndLiked {
  portfolioid: string
  Portfolio: {
    id: string
    title: string
    content: string
    createdAt: string
    likeCount: number
  }
}

export interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  likeCount: number
  viewCount: number
}

export interface Comment {
  id: number
  portfolioid: number
  userid: string
  content: string
  createdat: string
}
