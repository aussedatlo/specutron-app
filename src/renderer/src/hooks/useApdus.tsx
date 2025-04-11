import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { APDU } from 'src/types/apdu'

export function useApdus() {
  const [apdus, setApdus] = useState<APDU[]>([])

  const fetchApdus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/apdu/history')
      if (!response.ok) throw new Error('Failed to fetch APDUs')
      const data = await response.json()
      setApdus(data)
    } catch (error) {
      console.error('❌ Error fetching APDUs:', error)
      toast.error('Failed to load APDU history')
    }
  }, [])

  const clearApdus = async () => {
    try {
      await fetch('http://localhost:5001/apdu/clear', { method: 'POST' })
      setApdus([])
      toast.success('APDU history cleared')
    } catch (error) {
      console.error('❌ Error clearing APDUs:', error)
      toast.error('Failed to clear APDU history')
    }
  }

  const sendApdu = async (input: string) => {
    if (!input) return
    try {
      const response = await fetch('http://localhost:5001/apdu/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: input.startsWith('0x') ? input.slice(2) : input })
      })
      const body = await response.json()
      if (body.error) {
        toast.error('Error sending APDU')
      } else {
        toast.success('APDU sent')
        fetchApdus() // Refresh history after sending
      }
    } catch (error) {
      console.error('❌ Error sending APDU:', error)
      toast.error('Failed to send APDU')
    }
  }

  return { apdus, fetchApdus, clearApdus, sendApdu }
}
