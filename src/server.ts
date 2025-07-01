import dotenv from 'dotenv'
import path from 'path'
import { getPayloadClient } from './get-payload'
import { startServer } from './server/start'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    // Initialize Payload
    const payload = await getPayloadClient()

    // Start the server
    const server = await startServer({
      payload,
      express: payload.express as any,
    })

    server.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Admin panel: http://localhost:${PORT}/admin`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()