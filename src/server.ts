const dotenv = require('dotenv');
const path = require('path');
import { getPayloadClient } from './get-payload';
import { startServer } from './server/start';
export type { ExpressContext, WebhookRequest } from './server/start';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = Number(process.env.PORT) || 5000;

const start = async (): Promise<void> => {
  try {
    console.log('🚀 Starting INBOLA server...');
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI ? 'Connected' : 'Not configured'}`);
    console.log(`🌐 Server URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    console.log(`🚪 Port: ${PORT}`);

    // Initialize Payload
    console.log('⚡ Initializing Payload CMS...');
    const payload = await getPayloadClient();
    console.log('✅ Payload CMS initialized successfully');

    // Start the server
    console.log('🌐 Starting Express server...');
    const server = await startServer({
      payload,
      express: payload.express as any,
    });

    console.log('🎉 Server started successfully!');
    console.log(`📱 Frontend: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    console.log(`⚙️  Admin Panel: ${process.env.NEXT_PUBLIC_SERVER_URL}/sell`);
    console.log(`🔍 Health Check: ${process.env.NEXT_PUBLIC_SERVER_URL}/health`);

  } catch (error) {
    console.error('❌ Error starting server:', error);

    if (error instanceof Error) {
      if (error.message.includes('MongoDB')) {
        console.error('🔴 MongoDB Connection Error:');
        console.error('   - Check if MongoDB is running');
        console.error('   - Verify MONGODB_URI in .env file');
        console.error('   - Check network connectivity');
      }

      if (error.message.includes('EADDRINUSE')) {
        console.error('🔴 Port Already in Use:');
        console.error(`   - Port ${PORT} is already being used`);
        console.error('   - Try changing PORT in .env file');
        console.error('   - Or kill the process using this port');
      }
    }

    process.exit(1);
  }
};

start();