import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { APDU } from '../types/apdu'
import cors from 'cors'

let apdus: APDU[] = []

export const createExpressApp = () => {
  const app = express()
  const TARGET_URL = 'http://localhost:5000'

  // Middleware to parse JSON bodies
  app.use(bodyParser.json())

  // Middleware to enable CORS
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    })
  )

  app.get('/apdu/history', (_req: Request, res: Response) => {
    res.json(apdus)
  })

  app.post('/apdu/clear', (_req: Request, res: Response) => {
    apdus = []
    res.json({ message: 'APDU history cleared' })
  })

  app.use(
    '/apdu',
    createProxyMiddleware<Request, Response>({
      target: TARGET_URL,
      changeOrigin: true,
      pathRewrite: { '/': '/apdu' },
      on: {
        proxyReq: (proxyReq, req: Request) => {
          if (req.body && Object.keys(req.body).length > 0) {
            const bodyData = JSON.stringify(req.body)

            apdus.push({
              id: apdus.length,
              type: 'sent',
              data: req.body.data,
              timestamp: new Date()
            })

            console.log('APDU sent:', req.body.data)

            proxyReq.setHeader('Content-Type', 'application/json')
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
            proxyReq.write(bodyData)
          }
        },
        proxyRes: (proxyRes) => {
          let data = ''
          proxyRes.on('data', (chunk) => {
            data += chunk
          })
          proxyRes.on('end', () => {
            apdus.push({
              id: apdus.length,
              type: 'received',
              data: JSON.parse(data).data,
              timestamp: new Date()
            })
            console.log('APDU received:', JSON.parse(data).data)
          })
        }
      }
    })
  )

  // Start server
  const PORT = 5001
  app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}, only forwarding /apdu requests`)
  })

  return app
}
