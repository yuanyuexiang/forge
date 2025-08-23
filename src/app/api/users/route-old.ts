import { NextRequest, NextResponse } from 'next/server';

// 使用本地 GraphQL 代理端点
const GRAPHQL_PROXY_URL = '/api/graphql';

// GraphQL 查询：获取所有用户
const GET_USERS_QUERY = `
  query GetUsers($limit: Int, $offset: Int, $sort: [String]) {
    users(limit: $limit, offset: $offset, sort: $sort) {
      id
      first_name
      last_name
      email
      phone
      status
      created_at
      last_access
      orders {
        id
        total_price
        status
        created_at
      }
    }
  }
`;

// GraphQL 查询：根据ID获取用户详情
const GET_USER_BY_ID_QUERY = `
  query GetUserById($id: ID!) {
    users_by_id(id: $id) {
      id
      first_name
      last_name
      email
      phone
      status
      created_at
      last_access
      orders {
        id
        total_price
        status
        created_at
        order_items {
          id
          quantity
          price
          product {
            name
          }
        }
        payment {
          payment_method
          status
        }
      }
    }
  }
`;

// GraphQL 突变：更新用户信息
const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: ID!, $data: update_users_input!) {
    update_users_item(id: $id, data: $data) {
      id
      first_name
      last_name
      email
      phone
      status
      updated_at
    }
  }
`;

async function executeGraphQLQuery(query: string, variables: any, authToken?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${GRAPHQL_PROXY_URL}`, {
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

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['created_at'];
    
    if (userId) {
      // 获取单个用户详情
      console.log(`Users API - GraphQL 获取用户详情: ${userId}`);
      const data = await executeGraphQLQuery(GET_USER_BY_ID_QUERY, { id: userId }, token);
      
      if (!data.users_by_id) {
        return NextResponse.json(
          { error: '用户未找到' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(data.users_by_id);
    } else {
      // 获取用户列表
      console.log('Users API - GraphQL 获取用户列表');
      const data = await executeGraphQLQuery(GET_USERS_QUERY, {
        limit,
        offset,
        sort
      }, token);
      
      console.log(`Users API - 成功获取 ${data.users?.length || 0} 个用户`);
      return NextResponse.json(data.users || []);
    }
    
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return NextResponse.json(
      { error: '获取用户信息失败' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json(
        { error: '用户ID必需' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Users API - GraphQL 更新用户 ${userId}:`, updateData);
    
    const data = await executeGraphQLQuery(
      UPDATE_USER_MUTATION, 
      { id: userId, data: updateData }, 
      token
    );
    
    console.log('Users API - GraphQL 成功更新用户信息');
    return NextResponse.json(data.update_users_item);
    
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json(
      { error: '更新用户信息失败' },
      { status: 500 }
    );
  }
}
