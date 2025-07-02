
import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';
import { cache } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const cacheKey = `product:${id}`;
    
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

    const product = await payload.findByID({
      collection: 'products',
      id,
      depth: 3
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.approvedForSale !== 'approved') {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 404 }
      );
    }

    // Get related products
    const { docs: relatedProducts } = await payload.find({
      collection: 'products',
      where: {
        and: [
          {
            category: { equals: product.category }
          },
          {
            id: { not_equals: product.id }
          },
          {
            approvedForSale: { equals: 'approved' }
          },
          {
            inStock: { equals: true }
          }
        ]
      },
      limit: 4,
      depth: 2,
      sort: '-createdAt'
    });

    const result = {
      product,
      relatedProducts
    };

    // Cache for 10 minutes
    try {
      await cache.setex(cacheKey, 600, JSON.stringify(result));
    } catch (error) {
      console.log('Cache set error:', error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
