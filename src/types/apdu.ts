export type APDU = {
  id: number
  type: 'sent' | 'received'
  data: string
  timestamp: Date
}
