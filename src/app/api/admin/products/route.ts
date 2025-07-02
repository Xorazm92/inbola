
import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/get-payload';
import { getServerSideUser } from '@/lib/payload-utlis';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const nextCookies = await cookies();
    const { user } = await getServerSideUser(nextCookies);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const payload = await getPayloadClient();

    const where: any = {};
    if (status) {
      where.approvedForSale = { equals: status };
    }

    const { docs: products, totalPages, totalDocs } = await payload.find({
      collection: 'products',
      where,
      sort: '-createdAt',
      limit,
      page,
      depth: 2
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        totalPages,
        totalDocs,
        limit
      }
    });
  } catch (error) {
    console.error('Admin products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const nextCookies = await cookies();
    const { user } = await getServerSideUser(nextCookies);

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId, status } = await request.json();

    if (!productId || !status) {
      return NextResponse.json(
        { error: 'Product ID and status are required' },
        { status: 400 }
      );
    }

    const payload = await getPayloadClient();

    const updatedProduct = await payload.update({
      collection: 'products',
      id: productId,
      data: {
        approvedForSale: status
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Admin product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
