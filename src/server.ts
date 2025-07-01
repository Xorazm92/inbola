import dotenv from 'dotenv'
import path from 'path'
import { getPayloadClient } from './get-payload'
import { startServer } from './server/start'
export type { ExpressContext, WebhookRequest } from './server/start'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PORT = Number(process.env.PORT) || 5000;

// Trigger restart again
const start = async (): Promise<void> => {
  try {
    // Initialize Payload
    const payload = await getPayloadClient()

    // Start the server
    const server = await startServer({
      payload,
      express: payload.express as any,
    })

    server.listen(PORT, '0.0.0.0', async () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Admin panel: ${process.env.NEXT_PUBLIC_SERVER_URL}/sell`);
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()