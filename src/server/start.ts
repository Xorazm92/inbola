
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
  const { payload, port = Number(process.env.PORT) || 5000 } = options
  const app = options.express || express()

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }))
  
  // Compression middleware
  app.use(compression())

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Handle Next.js requests
  app.use((req, res) => nextHandler(req, res))

  await nextApp.prepare()

  payload.logger.info('Next.js started')

  // Start the server on localhost
  app.listen(port, 'localhost', () => {
    payload.logger.info(`Server listening on http://localhost:${port}`)
    payload.logger.info(`Admin panel: http://localhost:${port}/sell`)
  })

  return app
}
