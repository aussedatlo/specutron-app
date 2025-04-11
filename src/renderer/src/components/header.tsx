import { Laptop, Logs, Settings } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <Tabs defaultValue="device" className="w-full mb-1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value="device"
          className="data-[state=active]:bg-primary w-full"
          onClick={() => navigate('/')}
        >
          <Laptop className="mr-1 size-3" />
          Emulator
        </TabsTrigger>

        <TabsTrigger
          value="apdu"
          className="data-[state=active]:bg-primary w-full"
          onClick={() => navigate('/apdu')}
        >
          <Logs className="mr-1 size-3" />
          APDU
        </TabsTrigger>

        <TabsTrigger
          value="apps"
          className="data-[state=active]:bg-primary w-full"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-1 size-3" /> Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
