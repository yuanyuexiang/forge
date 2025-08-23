import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery, DATA_QUERIES } from '../../lib/directus-config';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '认证失败' },
        { status: 401 }
      );
    }

    console.log('Products API - 通过 GraphQL 获取产品数据');

    const result = await executeGraphQLQuery(
      DATA_QUERIES.PRODUCTS,
      {},
      authHeader
    );
    
    const products = result.data?.products || [];
    console.log(`Products API - 成功获取 ${products.length} 个产品`);
    return NextResponse.json(products);

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { 
        error: '获取产品数据失败', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '认证失败' },
        { status: 401 }
      );
    }

    const productData = await request.json();
    
    const mutation = `
      mutation CreateProduct($data: create_products_input!) {
        create_products_item(data: $data) {
          id
          name
          description
          price
          stock
          created_at
          updated_at
        }
      }
    `;

    const result = await executeGraphQLQuery(
      mutation,
      { data: productData },
      authHeader
    );

    return NextResponse.json(result.data?.create_products_item);

  } catch (error) {
    console.error('Create Product Error:', error);
    return NextResponse.json(
      { 
        error: '创建产品失败',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
