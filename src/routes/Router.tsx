import { Home } from '@/pages/Home'
import { Login } from '@/pages/Portfolio/Login'
import { Bookmarks } from '@/pages/MyPage/Bookmarks'
import { EditProfile } from '@/pages/MyPage/EditProfile'

import Posts from '@/pages/MyPage/Posts'
import Profile from '@/pages/MyPage/Profile'
import { NotFound } from '@/pages/NotFound'
import { NewPortfolio } from '@/pages/Portfolio/NewPortfolio'
import PortfolioDetail from '@/pages/Portfolio/PortfolioDetail'
import { PortfolioList } from '@/pages/Portfolio/PortfolioList'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layouts/Layout'
import FormAndText from '@/pages/Example/FormAndText'
import { Signup } from '@/pages/Signup'
import { ProtectedRoute } from '@/layouts/ProtectedRoute'

interface RouteItem {
  path: string
  element: React.ReactNode
  children?: RouteItem[]
}

// 인증이 필요 없는 라우트
const publicRoutes: RouteItem[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
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
    path: '*',
    element: <NotFound />
  }
]

// 인증이 필요한 라우트
const protectedRoutes: RouteItem[] = [
  {
    path: '/example/form',
    element: <FormAndText />
  },
  {
    path: '/portfolio/new',
    element: <NewPortfolio />
  },
  {
    path: '/mypage',
    element: <Layout />,
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
  }
]

const wrapWithLayout = (routes: RouteItem[], isProtected = false) => {
  return routes.map(route => {
    if (route.children) {
      return {
        ...route,
        element: isProtected ? (
          <ProtectedRoute>
            <Layout>{route.element}</Layout>
          </ProtectedRoute>
        ) : (
          <Layout>{route.element}</Layout>
        ),
        children: route.children
      }
    }

    return {
      ...route,
      element: isProtected ? (
        <ProtectedRoute>
          <Layout>{route.element}</Layout>
        </ProtectedRoute>
      ) : (
        <Layout>{route.element}</Layout>
      )
    }
  })
}

export const router = createBrowserRouter([
  ...wrapWithLayout(publicRoutes),
  ...wrapWithLayout(protectedRoutes, true)
])
