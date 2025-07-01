
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

describe('API Tests', () => {
  beforeAll(async () => {
    // Test setup
  });

  afterAll(async () => {
    // Test cleanup
  });

  describe('Products API', () => {
    it('should fetch products', async () => {
      const response = await fetch(`${BASE_URL}/api/trpc/products.getInfiniteProducts`);
      expect(response.status).toBe(200);
    });

    it('should handle pagination', async () => {
      const response = await fetch(`${BASE_URL}/api/trpc/products.getInfiniteProducts?input={"limit":10,"cursor":0}`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.result.data).toBeDefined();
    });
  });

  describe('Auth API', () => {
    it('should reject invalid credentials', async () => {
      const response = await fetch(`${BASE_URL}/api/trpc/auth.signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'invalid@email.com',
          password: 'wrongpassword'
        })
      });
      
      expect(response.status).toBe(401);
    });
  });

  describe('Health Check', () => {
    it('should return server status', async () => {
      const response = await fetch(`${BASE_URL}/api/health`);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.status).toBe('ok');
    });
  });
});
