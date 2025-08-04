import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import { AuthProvider } from './context/auth/AuthProvider'
import { SearchProvider } from './context/search/SearchProvider'
import { AlarmProvider } from './context/alarm/AlarmProvied'
import { DmProvider } from './context/dm/DmProvider'

function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <AlarmProvider>
          <DmProvider>
            <RouterProvider router={router} />
          </DmProvider>
        </AlarmProvider>
      </AuthProvider>
    </SearchProvider>
  )
}

export default App
