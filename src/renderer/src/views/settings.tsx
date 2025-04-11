import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Settings } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsView() {
  return (
    <Card className="flex grow flex-col  overflow-hidden">
      <div className="bg-muted flex h-12 items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <Settings className="mr-1 size-5" />
        </div>
      </div>

      <CardContent className="align-center justify-center p-3">
        {[
          { name: 'Specutron API', url: 'https://localhost:5001' },
          { name: 'VNC server', url: 'ws://localhost:3337' },
          { name: 'Speculos API', url: 'https://localhost:5000' }
        ].map((item, index) => (
          <div key={index} className="mt-3">
            <div className="text-muted-foreground mb-1 flex items-center gap-1 text-sm">
              <span>{item.name}</span>
              <ExternalLink className="size-3" />
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted flex-1 rounded px-2 py-1 text-xs">{item.url}</code>
              <Button
                variant="ghost"
                size="sm"
                className="h-7"
                onClick={() => {
                  navigator.clipboard.writeText(item.url)
                  toast.success(`${item.url} URL copied to clipboard`, {
                    duration: 2000
                  })
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
