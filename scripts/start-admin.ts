import 'ignore-styles';
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { getPayloadClient } from '../src/get-payload';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const startAdminServer = async () => {
  try {
    console.log('🚀 Starting INBOLA Admin Server...');
    
    const payload = await getPayloadClient();
    console.log('✅ Payload CMS initialized successfully');

    const app = express();
    const PORT = 3003; // Different port for admin

    // Use Payload's express app
    app.use(payload.express);

    app.listen(PORT, () => {
      console.log(`🎉 Admin Server started successfully!`);
      console.log(`⚙️  Admin Panel: http://localhost:${PORT}/sell`);
      console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
    });

  } catch (error) {
    console.error('❌ Error starting admin server:', error);
    process.exit(1);
  }
};

startAdminServer();
