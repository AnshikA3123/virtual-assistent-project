import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import UserContext from './context/UserContext.jsx'

// Get base path from Vite config (removes trailing slash if present)
const basename = import.meta.env.BASE_URL?.replace(/\/$/, '') || '/virtual-assistent-project';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename}>
    <UserContext>
      <App />
    </UserContext>
  </BrowserRouter>
)
