import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/reset.css'
import './global.css'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)
