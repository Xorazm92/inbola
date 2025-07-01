
import Redis from 'ioredis';

class CacheService {
  private redis: Redis | null = null;
  private memoryCache: Map<string, { value: any; expires: number }> = new Map();

  constructor() {
    // Redis faqat production da ishlatiladi
    if (process.env.NODE_ENV === 'production' && process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL);
        console.log('✅ Redis cache ulandi');
      } catch (error) {
        console.log('⚠️ Redis ulanmadi, memory cache ishlatiladi');
      }
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.redis) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
      }

      // Memory cache fallback
      const cached = this.memoryCache.get(key);
      if (cached && cached.expires > Date.now()) {
        return cached.value;
      }
      if (cached) {
        this.memoryCache.delete(key);
      }
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.setex(key, ttl, JSON.stringify(value));
        return;
      }

      // Memory cache fallback
      this.memoryCache.set(key, {
        value,
        expires: Date.now() + ttl * 1000,
      });

      // Memory cache ni tozalash (100 dan ortiq bo'lsa)
      if (this.memoryCache.size > 100) {
        const firstKey = this.memoryCache.keys().next().value;
        if (firstKey) {
          this.memoryCache.delete(firstKey);
        }
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.del(key);
        return;
      }
      this.memoryCache.delete(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.flushdb();
        return;
      }
      this.memoryCache.clear();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}

export const cache = new CacheService();
