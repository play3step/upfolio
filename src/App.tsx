import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { AuthProvider } from './context/AuthProvider'
import { SearchProvider } from './context/search/SearchProvider'
import { AlarmProvider } from './context/alarm/AlarmProvied'

function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <AlarmProvider>
          <RouterProvider router={router} />
        </AlarmProvider>
      </AuthProvider>
    </SearchProvider>
  )
}

export default App
