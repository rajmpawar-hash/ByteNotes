import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import { Analytics } from '@vercel/analytics/react'
// @ts-ignore
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
