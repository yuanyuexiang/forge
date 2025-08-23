import { NextRequest, NextResponse } from 'next/server';

const GRAPHQL_ENDPOINT = '/api/graphql';

// 使用 GraphQL 需要先获取有效的认证 token，现在先创建一个基于现有数据结构的查询
async function fetchProductsViaGraphQL(authHeader?: string) {
  // 基于我们观察到的实际工作情况，使用更通用的查询方式
  const query = `
    query {
      products: products {
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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${GRAPHQL_ENDPOINT}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data?.products || [];
}

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

    const products = await fetchProductsViaGraphQL(authHeader);
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${GRAPHQL_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ 
        query: mutation,
        variables: { data: productData }
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      return NextResponse.json(
        { error: 'GraphQL 错误', details: result.errors },
        { status: 400 }
      );
    }

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
