import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_GRAPHQL_URL = 'https://directus.matrix-net.tech/graphql';

// GraphQL 查询：获取单个产品
const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    products_by_id(id: $id) {
      id
      name
      description
      price
      stock
      category
      images
      status
      created_at
      updated_at
    }
  }
`;

// GraphQL 突变：更新产品
const UPDATE_PRODUCT_MUTATION = `
  mutation UpdateProduct($id: ID!, $data: update_products_input!) {
    update_products_item(id: $id, data: $data) {
      id
      name
      description
      price
      stock
      category
      images
      status
      updated_at
    }
  }
`;

// GraphQL 突变：删除产品
const DELETE_PRODUCT_MUTATION = `
  mutation DeleteProduct($id: ID!) {
    delete_products_item(id: $id) {
      id
    }
  }
`;

async function executeGraphQLQuery(query: string, variables: any, authToken?: string) {
  try {
    const response = await fetch(DIRECTUS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL 错误:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    console.error('GraphQL 请求失败:', error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    console.log(`Product Detail API - GraphQL 获取产品 ${id}`);
    
    const data = await executeGraphQLQuery(GET_PRODUCT_QUERY, { id }, token);
    
    if (!data.products_by_id) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      );
    }
    
    console.log(`Product Detail API - GraphQL 成功获取产品 ${id}`);
    return NextResponse.json(data.products_by_id);
    
  } catch (error) {
    console.error('GraphQL 获取产品详情失败:', error);
    return NextResponse.json(
      { error: '获取产品详情失败' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Product Detail API - GraphQL 更新产品 ${id}:`, updateData);
    
    const data = await executeGraphQLQuery(
      UPDATE_PRODUCT_MUTATION, 
      { id, data: updateData }, 
      token
    );
    
    console.log(`Product Detail API - GraphQL 成功更新产品 ${id}`);
    return NextResponse.json(data.update_products_item);
    
  } catch (error) {
    console.error('GraphQL 更新产品失败:', error);
    return NextResponse.json(
      { error: '更新产品失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    console.log(`Product Detail API - GraphQL 删除产品 ${id}`);
    
    await executeGraphQLQuery(DELETE_PRODUCT_MUTATION, { id }, token);
    
    console.log(`Product Detail API - GraphQL 成功删除产品 ${id}`);
    return NextResponse.json({ message: '产品删除成功' });
    
  } catch (error) {
    console.error('GraphQL 删除产品失败:', error);
    return NextResponse.json(
      { error: '删除产品失败' },
      { status: 500 }
    );
  }
}
