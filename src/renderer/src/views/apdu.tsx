import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Logs, RefreshCw, Send, SortAsc, SortDesc, Trash } from 'lucide-react'
import { useApdus } from '@/hooks/useApdus'

const formatAPDU = (data: string) => data?.match(/.{1,2}/g)?.join(' ') || ''

export default function ApduView() {
  const { apdus, fetchApdus, clearApdus, sendApdu } = useApdus()
  const [input, setInput] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    fetchApdus()
  }, [fetchApdus])

  const sortedApdus = useMemo(() => (sortAsc ? apdus : [...apdus].reverse()), [apdus, sortAsc])

  return (
    <Card className="flex grow flex-col  overflow-hidden">
      <div className="bg-muted flex h-12 items-center justify-between p-2">
        <Logs className="mr-1 size-5" />
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            onClick={() => setSortAsc((prev) => !prev)}
          >
            {sortAsc ? <SortAsc className="size-3" /> : <SortDesc className="size-3" />}
          </Button>
          <Button size="icon" variant="ghost" className="size-6" onClick={fetchApdus}>
            <RefreshCw className="size-3" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button size="icon" variant="ghost" className="size-6" onClick={clearApdus}>
            <Trash className="size-3" />
            <span className="sr-only">Clear</span>
          </Button>
        </div>
      </div>

      <CardContent className="align-center justify-center p-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter APDU"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button className="ml-2 h-auto border" onClick={() => sendApdu(input)}>
            <Send className="mr-1 size-3" />
          </Button>
        </div>

        <Separator className="my-3" />

        <ScrollArea className="mb-4 flex-1">
          {apdus.length === 0 ? (
            <div className="text-muted-foreground text-center">No APDU logs available</div>
          ) : (
            sortedApdus.map((apdu) => (
              <div key={apdu.id} className="mb-3 last:mb-0">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant={apdu.type === 'sent' ? 'default' : 'secondary'}>
                    {apdu.type === 'sent' ? '→ SENT' : '← RECEIVED'}
                  </Badge>
                  <span className="text-muted-foreground text-xs">
                    {new Date(apdu.timestamp).toLocaleString()}
                  </span>
                </div>
                <code className="bg-muted flex-1 rounded px-2 py-1 text-xs">
                  {formatAPDU(apdu.data)}
                </code>
                <Separator className="mt-2" />
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
