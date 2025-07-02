
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

describe('API Endpoints', () => {
  beforeAll(async () => {
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  describe('Health Check', () => {
    test('GET /api/health should return status ok', async () => {
      const response = await fetch(`${BASE_URL}/api/health`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.status).toBe('ok');
      expect(data.timestamp).toBeDefined();
    });
  });

  describe('Products API', () => {
    test('GET /api/products should return products list', async () => {
      const response = await fetch(`${BASE_URL}/api/products`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.products).toBeDefined();
      expect(data.pagination).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
    });

    test('GET /api/products with search should filter results', async () => {
      const response = await fetch(`${BASE_URL}/api/products?search=test`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.products).toBeDefined();
      expect(Array.isArray(data.products)).toBe(true);
    });

    test('GET /api/products with category filter should work', async () => {
      const response = await fetch(`${BASE_URL}/api/products?category=toys`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.products).toBeDefined();
    });

    test('GET /api/products with price range should work', async () => {
      const response = await fetch(`${BASE_URL}/api/products?minPrice=10&maxPrice=100`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.products).toBeDefined();
    });
  });

  describe('Categories API', () => {
    test('GET /api/categories should return categories with stats', async () => {
      const response = await fetch(`${BASE_URL}/api/categories`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.categories).toBeDefined();
      expect(data.total).toBeDefined();
      expect(Array.isArray(data.categories)).toBe(true);
    });
  });

  describe('Documentation', () => {
    test('GET /api/docs should return Swagger UI', async () => {
      const response = await fetch(`${BASE_URL}/api/docs`);
      expect(response.status).toBe(200);
      
      const html = await response.text();
      expect(html).toContain('swagger-ui');
    });

    test('GET /api/docs/swagger.json should return OpenAPI spec', async () => {
      const response = await fetch(`${BASE_URL}/api/docs/swagger.json`);
      expect(response.status).toBe(200);
      
      const spec = await response.json();
      expect(spec.openapi).toBeDefined();
      expect(spec.info).toBeDefined();
      expect(spec.paths).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('Non-existent endpoint should return 404', async () => {
      const response = await fetch(`${BASE_URL}/api/non-existent`);
      expect(response.status).toBe(404);
    });

    test('Invalid product ID should return 404', async () => {
      const response = await fetch(`${BASE_URL}/api/products/invalid-id`);
      expect(response.status).toBe(404);
    });
  });

  describe('Performance Tests', () => {
    test('Products API should respond within acceptable time', async () => {
      const startTime = Date.now();
      const response = await fetch(`${BASE_URL}/api/products?limit=50`);
      const endTime = Date.now();
      
      expect(response.status).toBe(200);
      expect(endTime - startTime).toBeLessThan(3000); // 3 seconds max
    });

    test('Cached requests should be faster', async () => {
      // First request
      const start1 = Date.now();
      await fetch(`${BASE_URL}/api/categories`);
      const time1 = Date.now() - start1;

      // Second request (should be cached)
      const start2 = Date.now();
      await fetch(`${BASE_URL}/api/categories`);
      const time2 = Date.now() - start2;

      expect(time2).toBeLessThan(time1);
    });
  });

  describe('Security Tests', () => {
    test('Admin endpoints should require authentication', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/products`);
      expect(response.status).toBe(401);
    });
  });
});

// CURL Commands for Manual Testing
console.log(`
Manual Testing with CURL:

# Health Check
curl -X GET "${BASE_URL}/api/health"

# Get Products
curl -X GET "${BASE_URL}/api/products"

# Search Products
curl -X GET "${BASE_URL}/api/products?search=toy&category=toys&minPrice=10&maxPrice=100"

# Get Categories
curl -X GET "${BASE_URL}/api/categories"

# Get Single Product (replace with actual product ID)
curl -X GET "${BASE_URL}/api/products/[PRODUCT_ID]"

# API Documentation
curl -X GET "${BASE_URL}/api/docs/swagger.json"

# Performance Test
curl -w "@curl-format.txt" -o /dev/null -s "${BASE_URL}/api/products"

# Create curl-format.txt file:
echo "time_namelookup:  %{time_namelookup}\\ntime_connect:     %{time_connect}\\ntime_appconnect:  %{time_appconnect}\\ntime_pretransfer: %{time_pretransfer}\\ntime_redirect:    %{time_redirect}\\ntime_starttransfer: %{time_starttransfer}\\ntime_total:       %{time_total}" > curl-format.txt
`);
