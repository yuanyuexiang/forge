import { NextRequest, NextResponse } from 'next/server';
import { DIRECTUS_CONFIG } from '../../lib/directus-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = new Headers();
    
    // 复制相关的头部信息
    headers.set('Content-Type', 'application/json');
    
    // 如果有认证头，传递给 Directus
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }

    console.log('GraphQL Proxy - Forwarding request to Directus');
    console.log('GraphQL Proxy - Request preview:', body.substring(0, 200) + '...');
    console.log('GraphQL Proxy - Has auth:', !!authHeader);

    const response = await fetch(DIRECTUS_CONFIG.GRAPHQL_URL, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.text();
    
    console.log('GraphQL Proxy - Response status:', response.status);
    console.log('GraphQL Proxy - Response preview:', data.substring(0, 200) + '...');

    // 如果响应不是 JSON，可能是错误
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch {
      console.error('GraphQL Proxy - Invalid JSON response:', data);
      return NextResponse.json(
        { 
          errors: [{ 
            message: 'GraphQL 代理响应格式错误',
            extensions: { code: 'PROXY_PARSE_ERROR' }
          }] 
        },
        { status: 500 }
      );
    }

    // 检查是否需要认证
    if (response.status === 401 || 
        (jsonData.errors && jsonData.errors.some((err: any) => 
          err.extensions?.code === 'INVALID_CREDENTIALS'))) {
      return NextResponse.json(
        { 
          errors: [{ 
            message: '认证失败，请重新登录',
            extensions: { code: 'AUTHENTICATION_REQUIRED' }
          }] 
        },
        { status: 401 }
      );
    }

    // 返回响应，保持原始状态码
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400', // 24小时缓存预检请求
      },
    });

  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    return NextResponse.json(
      { 
        errors: [{ 
          message: 'GraphQL 代理服务器错误',
          extensions: { code: 'PROXY_ERROR' }
        }] 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400', // 24小时缓存预检请求
    },
  });
}

// 添加 GET 方法支持（用于简单查询）
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const variables = url.searchParams.get('variables');
  
  if (!query) {
    return NextResponse.json(
      { errors: [{ message: 'Query parameter is required' }] },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        }
      }
    );
  }

  // 构造 GraphQL 请求体
  const body = JSON.stringify({
    query,
    variables: variables ? JSON.parse(variables) : {},
  });

  // 重用 POST 方法的逻辑
  const modifiedRequest = new NextRequest(request.url, {
    method: 'POST',
    headers: request.headers,
    body,
  });

  return POST(modifiedRequest);
}
