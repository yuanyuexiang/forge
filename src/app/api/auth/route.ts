import { NextRequest, NextResponse } from 'next/server';
import { DIRECTUS_CONFIG, AUTH_QUERIES, executeGraphQLQuery } from '../../lib/directus-config';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Directus Auth - 使用官方 GraphQL 认证:', email);
    
    // 使用官方的 /graphql/system 端点进行认证
    const response = await fetch(DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: AUTH_QUERIES.LOGIN,
        variables: { email, password },
      }),
    });
    
    const result = await response.json();
    
    console.log('Directus Auth - GraphQL 响应:', {
      status: response.status,
      hasData: !!result.data,
      hasErrors: !!result.errors
    });
    
    if (result.errors) {
      console.error('GraphQL 认证错误:', result.errors);
      return NextResponse.json(
        { 
          errors: result.errors.map((err: any) => ({ 
            message: err.message || '登录失败，请检查邮箱和密码' 
          }))
        },
        { status: 401 }
      );
    }
    
    if (result.data?.auth_login?.access_token) {
      // GraphQL 认证成功，获取用户信息
      const authData = result.data.auth_login;
      
      try {
        const userResponse = await fetch(DIRECTUS_CONFIG.GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.access_token}`,
          },
          body: JSON.stringify({
            query: AUTH_QUERIES.GET_CURRENT_USER,
          }),
        });
        
        const userResult = await userResponse.json();
        
        console.log('GraphQL 认证完全成功！');
        return NextResponse.json({
          access_token: authData.access_token,
          refresh_token: authData.refresh_token,
          expires: null, // GraphQL 认证可能不返回 expires
          user: userResult.data?.users_me || {
            id: null,
            email,
            first_name: null,
            last_name: null,
          }
        });
      } catch (userError) {
        console.warn('GraphQL 用户信息获取失败，但认证成功:', userError);
        return NextResponse.json({
          access_token: authData.access_token,
          refresh_token: authData.refresh_token,
          expires: null,
          user: { id: null, email, first_name: null, last_name: null }
        });
      }
    } else {
      // 认证失败
      return NextResponse.json(
        { 
          errors: [{ message: '登录失败，请检查邮箱和密码' }] 
        },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Directus GraphQL Auth Error:', error);
    return NextResponse.json(
      { 
        errors: [{ message: '服务器连接失败，请稍后重试' }] 
      },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
