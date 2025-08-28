import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    authLogger.info('Directus Auth - 使用服务器端 GraphQL 认证', { email });
    
    // 使用服务器端 GraphQL 查询函数进行认证
    try {
      const authData = await executeServerSideGraphQLQuery(
        AUTH_QUERIES.LOGIN,
        { email, password },
        undefined,
        true // 使用 system 端点
      );

      if (authData?.auth_login?.access_token) {
        // GraphQL 认证成功，获取用户信息
        const token = authData.auth_login.access_token;
        
        try {
          const userData = await executeServerSideGraphQLQuery(
            AUTH_QUERIES.GET_CURRENT_USER,
            {},
            token,
            false // 使用普通端点
          );
          
          authLogger.info('GraphQL 认证完全成功！');
          return NextResponse.json({
            access_token: authData.auth_login.access_token,
            refresh_token: authData.auth_login.refresh_token,
            expires: null, // GraphQL 认证可能不返回 expires
            user: userData?.users_me || {
              id: null,
              email,
              first_name: null,
              last_name: null,
            }
          });
        } catch (userError) {
          authLogger.warn('GraphQL 用户信息获取失败，但认证成功', userError);
          return NextResponse.json({
            access_token: authData.auth_login.access_token,
            refresh_token: authData.auth_login.refresh_token,
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
    } catch (authError: any) {
      authLogger.error('GraphQL 认证错误', authError);
      return NextResponse.json(
        { 
          errors: [{ 
            message: authError.message || '登录失败，请检查邮箱和密码' 
          }]
        },
        { status: 401 }
      );
    }
    
  } catch (error) {
    authLogger.error('Directus GraphQL Auth Error', error);
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
