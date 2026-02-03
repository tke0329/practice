import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  MenuApp  from './components/MenuApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuApp />
  </StrictMode>,
)
