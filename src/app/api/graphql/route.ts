import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 从请求头中获取认证信息
    const authHeader = request.headers.get('authorization');
    
    // 构造请求头
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    console.log('GraphQL Proxy - Request:', {
      query: body.query?.substring(0, 100) + '...',
      variables: body.variables,
      hasAuth: !!authHeader
    });
    
    // 转发请求到实际的 GraphQL API
    const response = await fetch('https://directus.matrix-net.tech/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    console.log('GraphQL Proxy - Response:', {
      status: response.status,
      hasData: !!data.data,
      hasErrors: !!data.errors,
      errors: data.errors
    });
    
    // 如果是 400 错误且是查询问题，返回更友好的错误
    if (response.status === 400 && data.errors) {
      // 检查是否是 schema 相关的错误
      const schemaError = data.errors.some((error: any) => 
        error.message?.includes('Cannot query field') || 
        error.message?.includes('Unknown field') ||
        error.message?.includes('Unknown type')
      );
      
      if (schemaError) {
        return new NextResponse(
          JSON.stringify({ 
            errors: [{ 
              message: 'API schema mismatch - falling back to demo mode',
              extensions: { 
                code: 'SCHEMA_MISMATCH',
                originalErrors: data.errors
              }
            }] 
          }),
          {
            status: 200, // 返回 200 让前端知道这是预期的错误
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }
    
    // 返回响应，设置正确的 CORS 头
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    return new NextResponse(
      JSON.stringify({ 
        errors: [{ 
          message: 'Proxy request failed',
          extensions: { code: 'PROXY_ERROR' }
        }] 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
