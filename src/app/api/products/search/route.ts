import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 });
    }

    // Build search query
    const where: any = {
      and: [
        {
          approvedForSale: {
            equals: 'approved'
          }
        },
        {
          inStock: {
            equals: true
          }
        },
        {
          or: [
            {
              name: {
                contains: query
              }
            },
            {
              description: {
                contains: query
              }
            },
            {
              category: {
                contains: query
              }
            }
          ]
        }
      ]
    };

    const products = await payload.find({
      collection: 'products',
      where,
      limit,
      page,
      sort: '-createdAt',
    });

    return NextResponse.json({
      success: true,
      products: products.docs,
      totalPages: products.totalPages,
      page: products.page,
      totalDocs: products.totalDocs,
      query,
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
