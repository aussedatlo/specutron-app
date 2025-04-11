import { useAppContext } from '@/components/providers/app-context-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Laptop, Play, RefreshCw, Square } from 'lucide-react'
import Screen from '@/components/vnc-screen'
import { toast } from 'sonner'

export default function EmulatorView() {
  const { connected, app, setApp } = useAppContext()

  const onStart = async (app: string) => {
    setApp(app)
    toast.success(`Starting ${app}`, { duration: 2000 })
    await window.api.startSpeculos(`${app}.elf`)
  }

  const onStop = async () => {
    setApp(null)
    toast.success(`Stopping current app`, { duration: 2000 })
    await window.api.stopSpeculos()
  }

  return (
    <Card className="flex grow flex-col overflow-hidden">
      <div className="bg-muted flex h-12 items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Laptop className="mr-1 size-5" />
          <Badge
            variant="outline"
            className="bg-background border-border flex h-7 items-center gap-2"
          >
            <div
              className={`size-1.5 rounded-full ${
                connected ? 'animate-[pulse_2s_ease-in-out_infinite] bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className="text-xs">{connected && app ? app : 'Not connected'}</span>
          </Badge>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-6" disabled={connected}>
                <Play className="size-3" />
                <span className="sr-only">Start App</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {['Ethereum', 'Bitcoin', 'Solana'].map((app) => (
                  <DropdownMenuItem key={app} onClick={() => onStart(app)}>
                    {app}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            onClick={onStop}
            disabled={!connected}
          >
            <Square className="size-3" />
            <span className="sr-only">Stop App</span>
          </Button>

          <Button size="icon" variant="ghost" className="size-6" disabled={!connected}>
            <RefreshCw className="size-3" />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      <CardContent className="align-center m-0 justify-center p-0">
        {!connected && (
          <div className="text-muted-foreground mb-4 p-3 text-center">No emulator connected</div>
        )}
        <Screen />
      </CardContent>
    </Card>
  )
}
