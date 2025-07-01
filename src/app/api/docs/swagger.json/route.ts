
import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Inbola API',
    version: '1.0.0',
    description: 'Bolalar uchun marketplace API documentation',
    contact: {
      name: 'Inbola Support',
      email: 'support@inbola.uz',
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/api/health': {
      get: {
        summary: 'Health check',
        description: 'Server va database holatini tekshirish',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Server ishlayapti',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
                    database: { type: 'string', example: 'connected' },
                    environment: { type: 'string', example: 'development' },
                  },
                },
              },
            },
          },
          '503': {
            description: 'Server yoki database bilan muammo',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Mahsulot ID' },
          name: { type: 'string', description: 'Mahsulot nomi' },
          description: { type: 'string', description: 'Mahsulot tavsifi' },
          price: { type: 'number', description: 'Narx' },
          category: { type: 'string', description: 'Kategoriya' },
          images: {
            type: 'array',
            items: { type: 'string' },
            description: 'Rasm URLlari',
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'price'],
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          code: { type: 'string' },
        },
      },
    },
  },
  tags: [
    {
      name: 'System',
      description: 'Tizim API lari',
    },
    {
      name: 'Products',
      description: 'Mahsulotlar bilan ishlash',
    },
    {
      name: 'Auth',
      description: 'Autentifikatsiya',
    },
  ],
};

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
