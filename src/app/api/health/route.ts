
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';

export async function GET() {
  try {
    // Database connection check
    const payload = await getPayloadClient();
    
    // Simple query to verify database connection
    await payload.find({
      collection: 'users',
      limit: 1,
    });

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
