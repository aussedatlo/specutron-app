import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface AppContextType {
  connected: boolean
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
  app: string | null
  setApp: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [connected, setConnected] = useState(false)
  const [app, setApp] = useState<string | null>(null)

  return (
    <AppContext.Provider value={{ connected, setConnected, app, setApp }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
