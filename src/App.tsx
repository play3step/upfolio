import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { AuthProvider } from './context/AuthProvider'
import { SearchProvider } from './context/search/SearchProvider'

function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SearchProvider>
  )
}

export default App
