import { Home } from '@/pages/Home'
import { Login } from '@/pages/Portfolio/Login'
import { Bookmarks } from '@/pages/MyPage/Bookmarks'
import { EditProfile } from '@/pages/MyPage/EditProfile'

import Posts from '@/pages/MyPage/Posts'
import Profile from '@/pages/MyPage/Profile'
import { NotFound } from '@/pages/NotFound'
import { NewPortfolio } from '@/pages/Portfolio/NewPortfolio'
import { PortfolioDetail } from '@/pages/Portfolio/PortfolioDetail'
import { PortfolioList } from '@/pages/Portfolio/PortfolioList'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import FormAndText from '@/pages/Example/FormAndText'

const routerList = [
  {
    path: '/example/form',
    element: <FormAndText />
  },
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
]

export const router = createBrowserRouter(
  routerList.map(item => {
    if (item.children) {
      return {
        path: item.path,
        element: <Layout />,
        children: item.children
      }
    }

    return {
      path: item.path,
      element: <Layout>{item.element}</Layout>
    }
  })
)
