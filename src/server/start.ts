import type { Payload } from 'payload'
import type { Express, Request, Response } from 'express'
import express from 'express'
import { getPayloadClient } from '../get-payload'
import { inferAsyncReturnType } from '@trpc/server'
import { PayloadRequest } from 'payload/types'
import { Stripe } from 'stripe'
import next from 'next'
import path from 'path'

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

  app.use((req, res) => nextHandler(req, res))

  await nextApp.prepare()

  payload.logger.info('Next.js started')

  // Actually start the server
  app.listen(port, () => {
    payload.logger.info(`Server listening on http://localhost:${port}`)
  })

  return app
}
