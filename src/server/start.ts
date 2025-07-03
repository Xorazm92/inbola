
import type { Payload } from 'payload'
import type { Express, Request, Response } from 'express'
import express from 'express'
import { getPayloadClient } from '../get-payload'
import { inferAsyncReturnType } from '@trpc/server'
import { PayloadRequest } from 'payload/types'
import { Stripe } from 'stripe'
import next from 'next'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'

const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: path.resolve(__dirname, '../../'),
})

const nextHandler = nextApp.getRequestHandler()

export const createContext = ({ req, res }: { req: Request; res: Response }) => ({
  req,
  res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>

export interface WebhookRequest extends PayloadRequest {
  body: Stripe.Event
}

export const startServer = async (options: {
  payload: Payload
  express?: Express
  port?: number
}) => {
  const { payload, port = Number(process.env.PORT) || 3001 } = options
  const app = options.express || express()

  // Prepare Next.js first
  await nextApp.prepare()
  payload.logger.info('Next.js started')

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }))

  // Compression middleware
  app.use(compression())

  // Health check endpoint (before Next.js handler)
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // API routes (before Next.js handler)
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Payload admin routes (before Next.js handler)
  if (payload.express) {
    app.use(payload.express)
  }

  // Handle Next.js requests (this should be last)
  app.use((req, res) => nextHandler(req, res))

  // Start the server with error handling
  const server = app.listen(port, () => {
    payload.logger.info(`🌐 Server listening on http://localhost:${port}`)
    payload.logger.info(`⚙️  Admin panel: http://localhost:${port}/sell`)
    payload.logger.info(`🔍 Health check: http://localhost:${port}/health`)
  })

  // Handle server errors
  server.on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      payload.logger.error(`❌ Port ${port} is already in use`)
      payload.logger.info(`💡 Try using a different port or kill the process using port ${port}`)
    } else {
      payload.logger.error('❌ Server error:', error)
    }
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    payload.logger.info('🛑 SIGTERM received, shutting down gracefully')
    server.close(() => {
      payload.logger.info('✅ Server closed')
      process.exit(0)
    })
  })

  process.on('SIGINT', () => {
    payload.logger.info('🛑 SIGINT received, shutting down gracefully')
    server.close(() => {
      payload.logger.info('✅ Server closed')
      process.exit(0)
    })
  })

  return app
}
