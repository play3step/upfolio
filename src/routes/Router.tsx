import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Bookmarks } from '@/pages/MyPage/Bookmarks'
import { Comments } from '@/pages/MyPage/Comments'
import Posts from '@/pages/MyPage/Posts'
import Profile from '@/pages/MyPage/Profile'
import { PortfolioDetail } from '@/pages/Portfolio/PortfolioDetail'
import { PortfolioList } from '@/pages/Portfolio/PortfolioList'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/portfolios',
    element: <PortfolioList />
  },
  {
    path: '/portfolios/:id',
    element: <PortfolioDetail />
  },
  {
    path: '/mypage',
    children: [
      {
        path: '',
        element: <Profile />
      },
      {
        path: 'posts',
        element: <Posts />
      },
      {
        path: 'comments',
        element: <Comments />
      },
      {
        path: 'bookmarks',
        element: <Bookmarks />
      }
    ]
  }
])
