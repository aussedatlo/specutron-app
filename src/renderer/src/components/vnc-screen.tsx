import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@/components/providers/app-context-provider'
import { VncScreen } from 'react-vnc'

export default function Screen() {
  const [height, setHeight] = useState(0)
  const { connected, setConnected } = useAppContext()
  const ref = useRef(null)

  useEffect(() => {
    setHeight(window.innerHeight)

    window.addEventListener('resize', () => {
      setHeight(window.innerHeight)
    })

    return () => {
      window.removeEventListener('resize', () => {
        setHeight(window.innerHeight)
      })
    }
  }, [])

  const onConnect = () => {
    setConnected(true)
  }

  const onDisconnect = () => {
    setConnected(false)
  }

  useEffect(() => {
    if (connected) return

    const timer = setInterval(() => {
      if (ref.current) {
        ;(ref.current as { connect: () => void }).connect()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [connected])

  return (
    <VncScreen
      url="ws://localhost:3337"
      scaleViewport
      style={{ height: connected ? height - 120 : 0 }}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
      loadingUI={<></>}
      ref={ref}
    />
  )
}
