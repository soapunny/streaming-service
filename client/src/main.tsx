// client/src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

//Javascript is non-blocking I/O.(Single Thread)

const rootElement = document.getElementById('root') //return HTMLElement or null
if (!rootElement) throw new Error('Cannot find the root element') //throw error if root element is 'null'

createRoot(rootElement).render(//rootElement is not null, so it is only HTMLElement
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
