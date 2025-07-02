
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';
import { PRODUCT_CATEGORIES } from '@/lib/kids-config';
import { cache } from '@/lib/cache';

export async function GET() {
  try {
    const cacheKey = 'categories:stats';
    
    let cachedResult;
    try {
      cachedResult = await cache.get(cacheKey);
      if (cachedResult) {
        return NextResponse.json(typeof cachedResult === 'string' ? JSON.parse(cachedResult) : cachedResult);
      }
    } catch (error) {
      console.log('Cache miss:', error);
    }

    const payload = await getPayloadClient();

    const categoriesWithStats = await Promise.all(
      PRODUCT_CATEGORIES.map(async (category) => {
        const { totalDocs } = await payload.count({
          collection: 'products',
          where: {
            category: { equals: category.value },
            approvedForSale: { equals: 'approved' },
            inStock: { equals: true }
          }
        });

        return {
          ...category,
          productCount: totalDocs
        };
      })
    );

    const result = {
      categories: categoriesWithStats,
      total: categoriesWithStats.reduce((sum, cat) => sum + cat.productCount, 0)
    };

    // Cache for 10 minutes
    try {
      await cache.set(cacheKey, JSON.stringify(result), 600);
    } catch (error) {
      console.log('Cache set error:', error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
