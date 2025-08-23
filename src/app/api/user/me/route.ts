import { NextRequest, NextResponse } from 'next/server';

// 使用本地 GraphQL 代理端点
const GRAPHQL_PROXY_URL = '/api/graphql';

// GraphQL 查询：获取当前用户信息
const GET_CURRENT_USER_QUERY = `
  query {
    users_me {
      id
      email
      first_name
      last_name
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { errors: [{ message: '未提供认证 token' }] },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // 通过 GraphQL 代理获取用户信息
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${GRAPHQL_PROXY_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_CURRENT_USER_QUERY,
      }),
    });
    
    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL 用户查询错误:', result.errors);
      return NextResponse.json(
        { errors: [{ message: 'Token 验证失败' }] },
        { status: 401 }
      );
    }
    
    if (result.data?.users_me) {
      return NextResponse.json(result.data.users_me);
    } else {
      return NextResponse.json(
        { errors: [{ message: '用户信息不存在' }] },
        { status: 404 }
      );
    }
    
  } catch (error) {
    console.error('GraphQL 用户信息查询失败:', error);
    return NextResponse.json(
      { errors: [{ message: '获取用户信息失败' }] },
      { status: 500 }
    );
  }
}
