import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login/Login'
import { Bookmarks } from '@/pages/MyPage/Bookmarks'
import { EditProfile } from '@/pages/MyPage/EditProfile'

import Posts from '@/pages/MyPage/Posts'
import Profile from '@/pages/MyPage/Profile'
import { NotFound } from '@/pages/NotFound'
import { NewPortfolio } from '@/pages/Portfolio/NewProtfolio'
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
    path: '/portfolio/new',
    element: <NewPortfolio />
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
        path: 'edit',
        element: <EditProfile />
      },
      {
        path: 'bookmarks',
        element: <Bookmarks />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
