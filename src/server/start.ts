import type { Payload } from 'payload'
import type { Express } from 'express'
import express from 'express'

export const startServer = async (options: {
  payload: Payload
  express?: Express
}) => {
  const { payload } = options
  const app = options.express || express()

  // Add your server middleware and routes here
  // For example:
  // app.use('/api', createRouter(payload))

  // Return the server instance
  return app
}
