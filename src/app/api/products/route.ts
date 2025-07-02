
import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';
import { cache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'createdAt';
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');

    const cacheKey = `products:${page}:${limit}:${category}:${sort}:${search}:${minPrice}:${maxPrice}:${featured}`;
    
    let cachedResult;
    try {
      cachedResult = await cache.get(cacheKey);
      if (cachedResult) {
        return NextResponse.json(JSON.parse(cachedResult));
      }
    } catch (error) {
      console.log('Cache miss:', error);
    }

    const payload = await getPayloadClient();

    const where: any = {
      approvedForSale: { equals: 'approved' },
      inStock: { equals: true }
    };

    if (category) {
      where.category = { equals: category };
    }

    if (search) {
      where.or = [
        { name: { contains: search } },
        { description: { contains: search } },
        { 'seo.keywords': { contains: search } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.greater_than_equal = parseFloat(minPrice);
      if (maxPrice) where.price.less_than_equal = parseFloat(maxPrice);
    }

    if (featured === 'true') {
      where.featured = { equals: true };
    }

    const { docs: products, totalPages, totalDocs, hasNextPage, hasPrevPage } = await payload.find({
      collection: 'products',
      where,
      sort: sort.startsWith('-') ? sort : `-${sort}`,
      limit,
      page,
      depth: 2
    });

    const result = {
      products,
      pagination: {
        page,
        totalPages,
        totalDocs,
        hasNextPage,
        hasPrevPage,
        limit
      }
    };

    // Cache for 5 minutes
    try {
      await cache.setex(cacheKey, 300, JSON.stringify(result));
    } catch (error) {
      console.log('Cache set error:', error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
