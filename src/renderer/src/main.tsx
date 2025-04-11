import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './components/providers/app-context-provider'
import { ThemeProvider } from './components/providers/theme-provider'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
)
