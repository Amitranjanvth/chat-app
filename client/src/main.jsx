import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '../context/Authcontext.jsx'
import { ChatProvider } from '../context/ChatContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
       <App />  
      </ChatProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
