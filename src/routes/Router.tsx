import { Home } from '@/pages/Home'
import { Login } from '@/pages/Auth/Login'
import BookmarkAndLike from '@/pages/MyPage/BookMark/BookmarkAndLike'
import { EditProfile } from '@/pages/MyPage/EditProfile'

import PostsAndComments from '@/pages/MyPage/Post/PostsAndComments'
import Profile from '@/pages/MyPage/MyProfile/Profile'
import { NotFound } from '@/pages/NotFound'
import { NewPortfolio } from '@/pages/Portfolio/NewPortfolio'
import PortfolioDetail from '@/pages/Portfolio/PortfolioDetail'
import { PortfolioList } from '@/pages/Portfolio/PortfolioList'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layouts/Layout'
import FormAndText from '@/pages/Example/FormAndText'
import { Signup } from '@/pages/Auth/Signup'
import { ProtectedRoute } from '@/components/layouts/ProtectedRoute'
import EditPortfolio from '@/pages/Portfolio/EditPortfolio'
import MyPage from '@/pages/MyPage/MyPage'

interface RouteItem {
  path: string
  element: React.ReactNode
  children?: RouteItem[]
}

// 인증이 필요 없는 라우트
const publicRoutes: RouteItem[] = [
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
    path: 'edit/:id',
    element: <EditPortfolio />
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
    path: '/',
    element: <Home />
  },
  {
    path: '/portfolio/new',
    element: <NewPortfolio />
  },
  {
    path: '/mypage',
    element: <MyPage />,
    children: [
      {
        path: '',
        element: <Profile />
      },
      {
        path: 'posts',
        element: <PostsAndComments />
      },
      {
        path: 'edit',
        element: <EditProfile />
      },
      {
        path: 'bookmarks',
        element: <BookmarkAndLike />
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
