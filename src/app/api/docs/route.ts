
import { NextResponse } from 'next/server';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Inbola API',
    version: '1.0.0',
    description: 'Bolalar uchun marketplace API documentation',
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
    '/api/trpc/products.getInfiniteProducts': {
      get: {
        summary: 'Mahsulotlarni olish',
        description: 'Pagination bilan mahsulotlar ro\'yxatini olish',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            description: 'Nechta mahsulot qaytarish',
            schema: { type: 'integer', default: 10 },
          },
          {
            name: 'cursor',
            in: 'query',
            description: 'Pagination cursor',
            schema: { type: 'integer', default: 0 },
          },
        ],
        responses: {
          '200': {
            description: 'Mahsulotlar ro\'yxati',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    result: {
                      type: 'object',
                      properties: {
                        data: {
                          type: 'object',
                          properties: {
                            items: {
                              type: 'array',
                              items: { $ref: '#/components/schemas/Product' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
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
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          category: { type: 'string' },
          images: {
            type: 'array',
            items: { type: 'string' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Inbola API Documentation</title>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui.css" />
        <style>
          html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
          *, *:before, *:after { box-sizing: inherit; }
          body { margin:0; background: #fafafa; }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui-bundle.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@3.25.0/swagger-ui-standalone-preset.js"></script>
        <script>
          window.onload = function() {
            const ui = SwaggerUIBundle({
              url: '/api/docs/swagger.json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
              ],
              plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
              ],
              layout: "StandaloneLayout"
            });
          };
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
