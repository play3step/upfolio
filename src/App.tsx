import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'
import SupaTest from './pages/SupaTest'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SupaTest />
    </>
  )
}

export default App
