import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/reset.css'
import './index.css'
import './global.css'

createRoot(document.getElementById('root')!).render(<App />)
